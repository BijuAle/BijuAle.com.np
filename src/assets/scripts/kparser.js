const { clear } = require("console");
const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "../../_data/My Clippings.txt");
const outputFilePath = path.join(__dirname, "../../_data/knotes.json");

// Function to parse the clippings
function parseClippings(clippings) {
  const entries = [];
  const lines = clippings.split("\n");
  let i = 0,
    newEntry,
    bookAuthor,
    otherMeta;

  for (let index = 0; index < lines.length; index = index + 5) {
    newEntry = {
      bookTitle: "",
      author: "",
      type: "",
      page: "",
      location: "",
      content: "",
      dateAdded: "",
    };
    bookAuthor = lines[index].match(/^(.*?)\((.*?)\)/);
    newEntry.bookTitle = bookAuthor[1].trim();
    newEntry.author = bookAuthor[2];
    newEntry.type = lines[index + 1].startsWith("- Your Highlight")
      ? "highlight"
      : lines[index + 1].startsWith("- Your Note")
      ? "note"
      : lines[index + 1].startsWith("- Your Bookmark")
      ? "bookmark"
      : "";
    otherMeta = lines[index + 1].match(
      /page (\d+).*Location ([\d-]+).*Added on (.*)/
    );
    newEntry.page = otherMeta[1];
    newEntry.location = otherMeta[2];
    newEntry.dateAdded = otherMeta[3];
    newEntry.content = lines[index + 3].trim();

    entries.push(newEntry);
  }
  return entries;
}

// Read clippings file and print JSON output
fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the clippings file:", err);
    return;
  }
  ``;
  const result = parseClippings(data);

  function transformKindleClippings(originalJson) {
    // Create a map to group entries by book
    const bookMap = new Map();
  
    originalJson.forEach(entry => {
      const { bookTitle, author, type, page, location, content, dateAdded } = entry;
      
      // Create or get the book entry
      if (!bookMap.has(bookTitle)) {
        bookMap.set(bookTitle, { bookTitle, author, highlights: [] });
      }
      const book = bookMap.get(bookTitle);
  
      // Create the new entry structure
      const newEntry = { type, page, location, content, dateAdded, note: null };
  
      // Handle notes
      if (type === 'note') {
        // Find the corresponding highlight
        const highlight = book.highlights.find(h => 
          h.type === 'highlight' && 
          h.page === page && 
          h.location.split('-')[0] === location
        );
        if (highlight) {
          highlight.note = { content, dateAdded };
        }
      } else {
        // Add highlight or bookmark to the book's highlights array
        book.highlights.push(newEntry);
      }
    });
  
    // Convert the map to an array of books
    return Array.from(bookMap.values());
  }
  
  const transformedJson = transformKindleClippings(result);

  // Write the parsed data to the JSON file
  fs.writeFile(outputFilePath, JSON.stringify(transformedJson, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File updated successfully with the parsed clippings data!");
    }
  });``
});
