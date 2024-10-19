const { clear } = require("console");
const fs = require("fs");
const path = require("path");

const inputFilePath = path.resolve(__dirname, "/Volumes/Kindle/documents/My Clippings.txt");
const outputFilePath = path.join(__dirname, "../../_data/knotes.json");

// Function to parse the clippings
function parseClippings(clippings) {
  const entries = [];
  const lines = clippings.split("\n");
  let newEntry, bookAuthor1, bookAuthor2, otherMeta, i;
  for (let index = 0; index < lines.length-1; index = index + 5) {
    newEntry = {
      bookTitle: "",
      author: "",
      type: "",
      page: "",
      location: "",
      content: "",
      dateAdded: "",
    };
    bookAuthor1 = lines[index].match(/^(.*?)\((.*?)\)/);
    bookAuthor2 = lines[index].match(/^(.*?)\s-\s(.*)$/);
    bookAuthor3 = lines[index].match(/(.*)-(.*)/);
    if (bookAuthor1) {
      newEntry.bookTitle = bookAuthor1[1].trim();
      newEntry.author = bookAuthor1[2];
    } else if (bookAuthor2) {
      newEntry.bookTitle = bookAuthor2[1].trim();
      newEntry.author = bookAuthor2[2];
    } else if (bookAuthor3) {
      newEntry.bookTitle = bookAuthor3[1].trim();
      newEntry.author = bookAuthor3[2];
    } else {
      newEntry.bookTitle = lines[index];
      newEntry.author = "TBD";
    }
    otherMeta = lines[index + 1].match(
      // For eg - - Your Highlight on page 5 | Location 68-69 | Added on Thursday, July 8, 2021 4:38:30 PM
      /page (\d+).*Location ([\d-]+).*Added on (.*)/
    );
    if (!otherMeta && lines[index + 1].includes("page")) {
      //For eg - Your Highlight on page ix-ix | Added on Thursday, July 15, 2021 9:26:14 AM
      otherMeta = lines[index + 1].match(/page ([^\s]+) \| Added on\ (.+)/);
      var temp = otherMeta[2];
      otherMeta[2] = "";
      otherMeta.push(temp);
    } else if (!otherMeta && !lines[index + 1].includes("Location")) {
      //For eg - - Your Highlight on page 8-8 | Added on Monday, July 12, 2021 6:47:16 PM
      otherMeta = lines[index + 1].match(/page ([\d-]+).*Added on (.*)/);
      var temp = otherMeta[2];
      otherMeta[2] = "";
      otherMeta.push(temp);
    } else if (!otherMeta && !lines[index + 1].includes("page")) {
      //For eg - Your Highlight on Location 1292-1294 | Added on Sunday, July 18, 2021 4:53:38 PM

      otherMeta = lines[index + 1].match(/Location ([\d-]+).*Added on (.*)/);
      var temp = otherMeta[1];
      var temp2 = otherMeta[2];
      otherMeta[1] = "";
      otherMeta[2] = temp;
      otherMeta.push(temp2);
    }
    if (lines[index + 1].startsWith("- Your Highlight")) {
      newEntry.type = "highlight";
      newEntry.page = otherMeta[1];
      newEntry.location = otherMeta[2];
      newEntry.dateAdded = otherMeta[3];
      newEntry.content = lines[index + 3].trim();
    } else if (lines[index + 1].startsWith("- Your Note")) {
      newEntry.type = "note";
      newEntry.page = otherMeta[1];
      newEntry.location = otherMeta[2];
      newEntry.dateAdded = otherMeta[3];
      newEntry.content = lines[index + 3].trim();
      console.log(newEntry.author + ": " + newEntry.content);
    } else if (lines[index + 1].startsWith("- Your Bookmark")) {
      newEntry = {};
      // index = index + 1;
      continue;
    }
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

  const result = parseClippings(data);

  function transformKindleClippings(originalJson) {
    // Create a map to group entries by book
    const bookMap = new Map();

    originalJson.forEach((entry) => {
      const { bookTitle, author, type, page, location, content, dateAdded } =
        entry;

      // Create or get the book entry
      if (!bookMap.has(bookTitle)) {
        bookMap.set(bookTitle, { bookTitle, author, highlights: [] });
      }
      const book = bookMap.get(bookTitle);

      // Create the new entry structure
      const newEntry = { type, page, location, content, dateAdded, note: null };

      // Handle notes
      if (type === "note") {
        // Find the corresponding highlight
        const highlight = book.highlights.find(
          (h) =>
            h.type === "highlight" &&
            (h.page.split("-")[0] === page ||
              h.location.split("-")[0] === location)
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
  fs.writeFile(
    outputFilePath,
    JSON.stringify(transformedJson, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log(
          "File updated successfully with the parsed clippings data!"
        );
      }
    }
  );
});
