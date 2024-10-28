const { DateTime } = require("luxon");
const slugify = require("slugify");
const katex = require("katex");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addFilter("formatted", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
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
