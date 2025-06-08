require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { DateTime } = require("luxon");
const slugify = require("slugify");
const katex = require("katex");
const titleCase = (str) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  
  eleventyConfig.addFilter("formatted", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("titleCase", titleCase);

  eleventyConfig.addFilter("date", function (dateObj) {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("slug", (str) => {
    if (!str) {
      return;
    }
    return slugify(str, {
      lower: true,
      strict: true,
      remove: /[']/g,
    });
  });

   eleventyConfig.addFilter("latex", (content) => {
    return content.replace(/\$\$(.+?)\$\$/g, (_, equation) => {
      const cleanEquation = equation
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

      return katex.renderToString(cleanEquation, { throwOnError: false });
    });
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

 

  eleventyConfig.addCollection("tags", function (collection) {
    const excludedTags = new Set(["page", "post"]); // Add tags to exclude
    const tagCount = {};

    // Loop through all items in the collection
    collection.getAll().forEach((item) => {
      if (item.data.tags) {
        item.data.tags.forEach((tag) => {
          // Skip excluded tags
          if (!excludedTags.has(tag)) {
            // Initialize the tag count if it doesn't exist
            if (!tagCount[tag]) {
              tagCount[tag] = 0;
            }
            // Increment the count for the tag
            tagCount[tag]++;
          }
        });
      }
    });

    // Convert the tagCount object to an array of objects
    return Object.entries(tagCount).map(([tag, count]) => ({
      tag,
      count,
    }));
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
