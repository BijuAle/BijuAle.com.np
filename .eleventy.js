require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { DateTime } = require("luxon");
const { parseClippings } = require("./src/_data/clippings.js");
const fs = require("fs");
const path = require("path");

function formatKindleDate(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  return `${dayName}, ${monthName} ${dayOfMonth}, ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}

function formatBlock(note) {
  const titleAuthor = note.rawTitleAuthor || `${note.title} (${note.author})`;
  const metadata = note.rawMetadata || `- Your ${note.type} on page ${note.page}${note.location ? ` | Location ${note.location}` : ''} | Added on ${note.dateAdded}`;
  return `${titleAuthor}\n${metadata}\n\n${note.content}`;
}

function writeClippings(filePath, clippings) {
  const content = clippings.map(c => formatBlock(c) + '\n').join('==========\n') + '==========\n';
  fs.writeFileSync(filePath, content, 'utf8');
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

module.exports = async function (eleventyConfig) {
  const { default: pluginRss } = await import("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("formatted", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("date", function (dateObj) {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  // Add getAllTags filter
  eleventyConfig.addFilter("getAllTags", (collectionsObj) => {
    let tagSet = new Set();
    Object.keys(collectionsObj).forEach((tag) => {
      if (tag !== "all" && tag !== "post" && (collectionsObj[tag] && collectionsObj[tag].length > 0)) {
        tagSet.add(tag);
      }
    });
    return [...tagSet];
  });

  const titleCase = (str) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  eleventyConfig.addFilter("titleCase", titleCase);

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  const katex = require("katex");
  eleventyConfig.addFilter("latex", (content) => {
    return content.replace(/\$\$(.+?)\$\$/g, (_, equation) => {
      const cleanEquation = equation
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

      return katex.renderToString(cleanEquation, { throwOnError: false });
    });
  });

  eleventyConfig.setServerOptions({
    middleware: [
      async function (req, res, next) {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = url.pathname;
        
        if (pathname.startsWith("/api/notes")) {
          const filePath = path.join(process.cwd(), "src/_data/My Clippings.txt");
          
          if (req.method === "GET" && pathname === "/api/notes") {
            try {
              const clippings = parseClippings(filePath);
              res.writeHead(200, { 
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
              });
              res.end(JSON.stringify(clippings));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }
          
          if (req.method === "POST" && pathname === "/api/notes/create") {
            try {
              const body = await readJsonBody(req);
              const clippings = parseClippings(filePath);
              
              const now = new Date();
              const formattedDate = formatKindleDate(now);
              
              const newNote = {
                title: body.title || "Untitled",
                author: body.author || "Unknown",
                type: body.type || "Highlight",
                page: body.page || "",
                location: body.location || "",
                dateAdded: formattedDate,
                content: body.content || ""
              };
              
              newNote.rawTitleAuthor = `${newNote.title} (${newNote.author})`;
              newNote.rawMetadata = `- Your ${newNote.type} on page ${newNote.page}${newNote.location ? ` | Location ${newNote.location}` : ''} | Added on ${newNote.dateAdded}`;
              
              clippings.push(newNote);
              writeClippings(filePath, clippings);
              
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, note: newNote }));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }
          
          if (req.method === "POST" && pathname === "/api/notes/update") {
            try {
              const body = await readJsonBody(req);
              const { original, updated } = body;
              
              if (!original || !updated) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Missing original or updated note data" }));
                return;
              }
              
              const clippings = parseClippings(filePath);
              const index = clippings.findIndex(c => 
                c.rawTitleAuthor === original.rawTitleAuthor &&
                c.rawMetadata === original.rawMetadata &&
                c.content === original.content
              );
              
              if (index === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Note not found" }));
                return;
              }
              
              // Update properties
              clippings[index].title = updated.title || clippings[index].title;
              clippings[index].author = updated.author || clippings[index].author;
              clippings[index].type = updated.type || clippings[index].type;
              clippings[index].page = updated.page || clippings[index].page;
              clippings[index].location = updated.location || clippings[index].location;
              clippings[index].content = updated.content !== undefined ? updated.content : clippings[index].content;
              
              // Rebuild raw lines
              clippings[index].rawTitleAuthor = `${clippings[index].title} (${clippings[index].author})`;
              clippings[index].rawMetadata = `- Your ${clippings[index].type} on page ${clippings[index].page}${clippings[index].location ? ` | Location ${clippings[index].location}` : ''} | Added on ${clippings[index].dateAdded}`;
              
              writeClippings(filePath, clippings);
              
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, note: clippings[index] }));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }
          
          if (req.method === "POST" && pathname === "/api/notes/delete") {
            try {
              const body = await readJsonBody(req);
              const { note } = body;
              
              if (!note) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Missing note data for deletion" }));
                return;
              }
              
              const clippings = parseClippings(filePath);
              const index = clippings.findIndex(c => 
                c.rawTitleAuthor === note.rawTitleAuthor &&
                c.rawMetadata === note.rawMetadata &&
                c.content === note.content
              );
              
              if (index === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Note not found" }));
                return;
              }
              
              clippings.splice(index, 1);
              writeClippings(filePath, clippings);
              
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }
          
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Endpoint not found" }));
          return;
        }
        
        next();
      }
    ]
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
    },
  };
};
