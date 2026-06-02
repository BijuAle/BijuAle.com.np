const fs   = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, 'clippings.json');
const TXT_PATH  = path.join(__dirname, 'My Clippings.txt');

// ── Fallback: parse the raw .txt if no JSON exists yet ──────────────────────
function parseClippings(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[clippings] File not found: ${filePath}`);
    return [];
  }

  const raw    = fs.readFileSync(filePath, 'utf8');
  const normal = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const blocks = normal.split(/={10}\n?/);
  const all    = [];

  blocks.forEach((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return;
    const lines = trimmed.split('\n');
    if (lines.length < 2) return;

    const titleAuthorLine = lines[0].trim();
    if (!titleAuthorLine) return;

    let title = titleAuthorLine, author = 'Unknown';
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
    let type = 'Highlight';
    if (metaLine.includes('Bookmark')) type = 'Bookmark';
    else if (metaLine.includes('Note'))  type = 'Note';

    let page = '', location = '', dateAdded = '';
    metaLine.split('|').forEach((part) => {
      const p = part.trim();
      if (p.includes('on page')) { const m = p.match(/page\s+([0-9-]+)/i); if (m) page = m[1]; }
      if (p.includes('Location')) { const m = p.match(/Location\s+([0-9-]+)/i); if (m) location = m[1]; }
      if (p.includes('Added on')) dateAdded = p.replace(/^-?\s*Added on\s+/i, '').trim();
    });

    const content = lines.slice(2).join('\n').trim();
    all.push({ id: index.toString(), title, author, type, page, location, dateAdded, content,
               category: 'other', myNote: '', deleted: false });
  });

  return all.filter(c => c.type !== 'Bookmark');
}

module.exports = function () {
  // Prefer the curated JSON; fall back to live .txt parsing
  if (fs.existsSync(JSON_PATH)) {
    try {
      const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
      // Only return non-deleted entries to the public site
      return data.filter(c => !c.deleted);
    } catch (e) {
      console.warn('[clippings] Failed to parse clippings.json, falling back to .txt');
    }
  }
  return parseClippings(TXT_PATH);
};

module.exports.parseClippings = parseClippings;
