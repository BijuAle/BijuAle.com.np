const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addFilter("formatted", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
});
    return {
      markdownTemplateEngine: "njk",
      dir: {
        input: "src",
        output: "dist",
        data:"_data"
      }
    };
  };