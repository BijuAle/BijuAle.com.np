const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.setTemplateFormats(['njk', 'html', 'md']);

    eleventyConfig.addPassthroughCopy("./assets/**");
    eleventyConfig.addPassthroughCopy('**/*.{jpg,jpeg,png,gif}');

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });  

};