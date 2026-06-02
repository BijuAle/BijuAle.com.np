#!/usr/bin/env node
/**
 * tools/import.js
 * Parses src/_data/My Clippings.txt → src/_data/clippings.json
 *
 * Run: node tools/import.js
 *
 * - New entries are appended; existing ones (matched by content hash) are preserved.
 * - Overlapping location ranges within the same book are flagged as duplicates.
 * - Note-type entries are merged into their nearest highlight.
 */

const fs   = require('fs');
const path = require('path');
const crypto = require('crypto');

const TXT_PATH  = path.join(__dirname, '../src/_data/My Clippings.txt');
const JSON_PATH = path.join(__dirname, '../src/_data/clippings.json');

// ── Default category map (title → category). Edit freely. ──────────────────
const CATEGORY_MAP = {
  // Theology / Christianity
  "The Bondage Breaker": "theology",
  "On God and Christ": "theology",
  "Theology of the Old Testament": "theology",
  "The Holy Bible, English Standard Version": "theology",

  // Philosophy
  "Meditations": "philosophy",
  "Matrix and Philosophy_ Welcome to the Desert of the Real, The": "philosophy",

  // Culture / Society
  "Sapiens": "culture",
};

// ── Helpers ─────────────────────────────────────────────────────────────────
function hash(str) {
  return crypto.createHash('sha1').update(str || '').digest('hex').slice(0, 12);
}

function parseLocationRange(loc) {
  if (!loc) return null;
  const parts = loc.split('-').map(Number);
  if (isNaN(parts[0])) return null;
  return [parts[0], parts[1] || parts[0]];
}

function rangesOverlap([a0, a1], [b0, b1]) {
  return a0 <= b1 && b0 <= a1;
}

// ── Parser ──────────────────────────────────────────────────────────────────
function parseClippingsTxt(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`[import] File not found: ${filePath}`);
    process.exit(1);
  }

  const raw    = fs.readFileSync(filePath, 'utf8');
  const normal = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const blocks = normal.split(/={10}\n?/);

  const all = [];

  blocks.forEach((block) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    const lines = trimmed.split('\n');
    if (lines.length < 2) return;

    const titleAuthorLine = lines[0].trim();
    if (!titleAuthorLine) return;

    // Parse title & author
    let title  = titleAuthorLine;
    let author = 'Unknown';

    const parenMatch = titleAuthorLine.match(/\(([^)]+)\)$/);
    if (parenMatch) {
      author = parenMatch[1].trim();
      title  = titleAuthorLine.slice(0, titleAuthorLine.lastIndexOf('(')).trim();
    } else {
      const dashIdx = titleAuthorLine.lastIndexOf(' - ');
      if (dashIdx !== -1) {
        author = titleAuthorLine.substring(dashIdx + 3).trim();
        title  = titleAuthorLine.substring(0, dashIdx).trim();
      }
    }

    const metaLine = lines[1].trim();

    // Type
    let type = 'Highlight';
    if (metaLine.includes('Bookmark')) type = 'Bookmark';
    else if (metaLine.includes('Note'))  type = 'Note';

    // Page / Location / Date
    let page = '', location = '', dateAdded = '';
    metaLine.split('|').forEach((part) => {
      const p = part.trim();
      if (p.includes('on page')) {
        const m = p.match(/page\s+([0-9-]+)/i);
        if (m) page = m[1];
      }
      if (p.includes('Location')) {
        const m = p.match(/Location\s+([0-9-]+)/i);
        if (m) location = m[1];
      }
      if (p.includes('Added on')) {
        dateAdded = p.replace(/^-?\s*Added on\s+/i, '').trim();
      }
    });

    const content = lines.slice(2).join('\n').trim();

    all.push({
      _rawTitleAuthor: titleAuthorLine,
      _rawMetadata:    metaLine,
      title,
      author,
      type,
      page,
      location,
      dateAdded,
      content,
    });
  });

  return all;
}

// ── Merge Notes into Highlights ──────────────────────────────────────────────
function mergeNotes(items) {
  const highlights = items.filter(i => i.type !== 'Bookmark' && i.type !== 'Note');
  const notes      = items.filter(i => i.type === 'Note');

  notes.forEach((note) => {
    const noteRange = parseLocationRange(note.location);

    let match = highlights.find(h =>
      h.title === note.title &&
      h.location && note.location &&
      h.location === note.location
    );

    if (!match && noteRange) {
      match = highlights.find(h => {
        if (h.title !== note.title || !h.location) return false;
        const hr = parseLocationRange(h.location);
        return hr && rangesOverlap(noteRange, hr);
      });
    }

    if (!match && note.page) {
      match = highlights.find(h =>
        h.title === note.title && h.page === note.page
      );
    }

    if (match) {
      match._myNote = match._myNote
        ? match._myNote + '\n\n' + note.content
        : note.content;
    } else {
      // Orphan note — keep as its own entry
      highlights.push({ ...note, _myNote: '' });
    }
  });

  return highlights;
}

// ── Duplicate Detection ──────────────────────────────────────────────────────
function detectDuplicates(items) {
  // Group by title
  const byTitle = {};
  items.forEach((item, idx) => {
    if (!byTitle[item.title]) byTitle[item.title] = [];
    byTitle[item.title].push({ item, idx });
  });

  const dupSet = new Set();

  Object.values(byTitle).forEach((group) => {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i].item;
        const b = group[j].item;
        const ra = parseLocationRange(a.location);
        const rb = parseLocationRange(b.location);

        // Same location range
        if (ra && rb && rangesOverlap(ra, rb)) {
          dupSet.add(group[i].idx);
          dupSet.add(group[j].idx);
        }
        // Identical content
        else if (a.content && b.content && a.content.trim() === b.content.trim()) {
          dupSet.add(group[i].idx);
          dupSet.add(group[j].idx);
        }
      }
    }
  });

  return dupSet;
}

// ── Build final entries ──────────────────────────────────────────────────────
function buildEntries(items, dupIndexes) {
  return items.map((item, idx) => {
    const contentHash = hash(item.title + '|' + item.location + '|' + item.content);
    return {
      id:            contentHash,
      title:         item.title,
      author:        item.author,
      category:      CATEGORY_MAP[item.title] || 'other',
      page:          item.page,
      location:      item.location,
      dateAdded:     item.dateAdded,
      content:       item.content,
      myNote:        item._myNote || '',
      isDuplicate:   dupIndexes.has(idx),
      deleted:       false,
    };
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────
function main() {
  console.log('[import] Parsing', TXT_PATH);
  const parsed = parseClippingsTxt(TXT_PATH);
  console.log(`[import] ${parsed.length} raw blocks found`);

  const merged = mergeNotes(parsed);
  console.log(`[import] ${merged.length} highlights after merging notes`);

  const dupSet = detectDuplicates(merged);
  console.log(`[import] ${dupSet.size} entries flagged as potential duplicates`);

  const fresh = buildEntries(merged, dupSet);

  // Load existing JSON and preserve edits (myNote, category, deleted)
  let existing = [];
  if (fs.existsSync(JSON_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
      console.log(`[import] ${existing.length} existing entries in clippings.json`);
    } catch {
      console.warn('[import] Could not parse existing clippings.json — overwriting');
    }
  }

  const existingById = {};
  existing.forEach(e => { existingById[e.id] = e; });

  // Merge: preserve user edits (myNote, category, deleted) for existing IDs
  const merged2 = fresh.map(entry => {
    if (existingById[entry.id]) {
      const old = existingById[entry.id];
      return {
        ...entry,
        myNote:   old.myNote   !== undefined ? old.myNote   : entry.myNote,
        category: old.category !== undefined ? old.category : entry.category,
        deleted:  old.deleted  !== undefined ? old.deleted  : entry.deleted,
      };
    }
    return entry;
  });

  const newCount = merged2.filter(e => !existingById[e.id]).length;

  fs.writeFileSync(JSON_PATH, JSON.stringify(merged2, null, 2), 'utf8');

  console.log(`[import] ✓ Written ${merged2.length} entries to clippings.json`);
  console.log(`[import]   ${newCount} new | ${dupSet.size} duplicates flagged`);
}

main();
