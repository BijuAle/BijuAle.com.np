const fs = require('fs');
const path = require('path');

// File paths
const inputFilePath = path.join(__dirname, '../../_data/My Clippings.txt');
const outputFilePath = path.join(__dirname, '../../_data/knotes.json');

// Function to process clippings and convert to structured JSON
function processClippings(data) {
  const lines = data.split('\n');
  const entries = [];
  let currentBook = null;

  lines.forEach((line, index) => {
    // Check for book title and author before encountering highlights/notes
    const bookAuthorLine = lines[index - 1];
    if (line.startsWith("==========") && bookAuthorLine) {
      const bookAuthor = bookAuthorLine.match(/^(.*?)\((.*?)\)/);
      if (bookAuthor) {
        currentBook = {
          book: bookAuthor[1].trim(),
          author: bookAuthor[2].trim(),
          highlights: []
        };
        entries.push(currentBook);
      }
    }

    // Check for highlights or notes
    if (currentBook && (line.startsWith('- Your Highlight') || line.startsWith('- Your Note'))) {
      const isHighlight = line.includes('Highlight');
      const match = line.match(/page (\d+).*Location ([\d-]+).*Added on (.*)/);
      const page = match ? match[1] : null;
      const location = match ? match[2] : null;
      const addedOn = match ? new Date(match[3]).toISOString() : null;

      let content = lines[index + 1]?.trim();
      console.log(content)
      if (isHighlight) {
        currentBook.highlights.push({
          text: content,
          page: Number(page),
          location,
          added_on: addedOn,
          note: null
        });
      } else if (currentBook.highlights.length > 0) {
        const lastHighlight = currentBook.highlights[currentBook.highlights.length - 1];
        lastHighlight.note = {
          page: Number(page),
          location,
          text: content,
          added_on: addedOn
        };
      }
    }
  });

  return { kindle_entries: entries };
}

// Read input file, process, and write output
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading input file:', err);
    return;
  }

  const processedData = processClippings(data);

  fs.writeFile(outputFilePath, JSON.stringify(processedData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing output file:', err);
    } else {
      console.log('Successfully wrote to', outputFilePath);
    }
  });
});