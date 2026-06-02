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
const { execSync } = require("child_process");

const CLIPPINGS_JSON = path.join(__dirname, "src/_data/clippings.json");

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

  // ── Kindle Clippings API (dev server only) ────────────────────────────────
  eleventyConfig.setServerOptions({
    middleware: [
      async function kindleApi(req, res, next) {
        // GET /api/clippings — serve clippings.json (all entries incl. deleted)
        if (req.method === "GET" && req.url === "/api/clippings") {
          try {
            const data = fs.existsSync(CLIPPINGS_JSON)
              ? fs.readFileSync(CLIPPINGS_JSON, "utf8")
              : "[]";
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Cache-Control", "no-store");
            res.end(data);
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        // POST /api/clippings — write updated clippings.json
        if (req.method === "POST" && req.url === "/api/clippings") {
          try {
            const body = await readJsonBody(req);
            fs.writeFileSync(CLIPPINGS_JSON, JSON.stringify(body, null, 2), "utf8");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true, count: Array.isArray(body) ? body.length : 0 }));
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
          }
          return;
        }

        // POST /api/clippings/import — re-run import script
        if (req.method === "POST" && req.url === "/api/clippings/import") {
          try {
            const out = execSync("node tools/import.js", { cwd: __dirname }).toString();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true, log: out }));
          } catch (e) {
            res.writeHead(500); res.end(JSON.stringify({ error: e.message, log: e.stdout?.toString() }));
          }
          return;
        }

        next();
      },
    ],
  });

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


  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
    },
  };
};
