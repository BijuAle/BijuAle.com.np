const fs = require('fs');
const path = require('path');

function parseClippings(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[clippings] File not found: ${filePath}`);
    return [];
  }
  
  const rawContent = fs.readFileSync(filePath, 'utf8');
  // Normalize line endings to LF
  const contentNormalized = rawContent.replace(/\r\n/g, '\n');
  
  // Split by the separator. Note that the last separator might leave a trailing empty string, so we filter it.
  const separator = '==========\n';
  const blocks = contentNormalized.split(separator);
  
  const clippings = [];
  
  blocks.forEach((block, index) => {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) return;
    
    const lines = trimmedBlock.split('\n');
    if (lines.length < 2) return;
    
    const titleAuthorLine = lines[0].trim();
    if (!titleAuthorLine) return;
    
    // Parse Title & Author
    let title = titleAuthorLine;
    let author = "Unknown";
    
    // Check for parenthesized author at the end, e.g. "The Bondage Breaker (Neil T. Anderson)"
    const parenMatch = titleAuthorLine.match(/\(([^)]+)\)$/);
    if (parenMatch) {
      author = parenMatch[1].trim();
      title = titleAuthorLine.slice(0, titleAuthorLine.lastIndexOf('(')).trim();
    } else {
      // Check for dash, e.g. "Title - Author"
      const dashIndex = titleAuthorLine.lastIndexOf(' - ');
      if (dashIndex !== -1) {
        author = titleAuthorLine.substring(dashIndex + 3).trim();
        title = titleAuthorLine.substring(0, dashIndex).trim();
      }
    }
    
    // Metadata line
    const metadataLine = lines[1].trim();
    
    // Type detection
    let type = "Highlight";
    if (metadataLine.includes("Bookmark")) {
      type = "Bookmark";
    } else if (metadataLine.includes("Note")) {
      type = "Note";
    }
    
    // Parse Page / Location / Date
    let page = "";
    let location = "";
    let dateAdded = "";
    
    const parts = metadataLine.split('|');
    parts.forEach(part => {
      const p = part.trim();
      if (p.includes("on page")) {
        const pageMatch = p.match(/page\s+([0-9-]+)/i);
        if (pageMatch) page = pageMatch[1];
      }
      if (p.includes("Location")) {
        const locMatch = p.match(/Location\s+([0-9-]+)/i);
        if (locMatch) location = locMatch[1];
      }
      if (p.includes("Added on")) {
        dateAdded = p.replace(/^-?\s*Added on\s+/i, '').trim();
      }
    });
    
    // The rest is content
    const content = lines.slice(2).join('\n').trim();
    
    clippings.push({
      id: index.toString(),
      title,
      author,
      type,
      page,
      location,
      dateAdded,
      content,
      rawTitleAuthor: titleAuthorLine,
      rawMetadata: metadataLine
    });
  });
  
  // Post-process: merge notes into their corresponding highlights
  const finalClippings = [];
  const notes = [];

  clippings.forEach(clip => {
    if (clip.type === "Bookmark") return; // Ignore bookmarks

    if (clip.type === "Note") {
      notes.push(clip);
    } else {
      finalClippings.push(clip);
    }
  });

  const getRange = (loc) => {
    if (!loc) return null;
    const pts = loc.split('-').map(Number);
    if (isNaN(pts[0])) return null;
    return [pts[0], pts[1] || pts[0]];
  };

  notes.forEach(note => {
    let match = finalClippings.find(c => c.title === note.title && c.location && note.location && c.location === note.location);
    
    if (!match && note.location) {
      const noteRange = getRange(note.location);
      if (noteRange) {
        match = finalClippings.find(c => {
          if (c.title !== note.title || !c.location) return false;
          const cRange = getRange(c.location);
          return cRange && (noteRange[0] <= cRange[1] && noteRange[1] >= cRange[0]);
        });
      }
    }
    
    if (!match && note.page) {
      match = finalClippings.find(c => c.title === note.title && c.page === note.page);
    }

    if (match) {
      if (match.noteContent) match.noteContent += "\n\n" + note.content;
      else match.noteContent = note.content;
    } else {
      finalClippings.push(note);
    }
  });

  finalClippings.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  return finalClippings;
}

module.exports = function() {
  const filePath = path.join(process.cwd(), 'src/_data/My Clippings.txt');
  return parseClippings(filePath);
};

// Also export the parsing function for reuse in other Node contexts if needed
module.exports.parseClippings = parseClippings;
