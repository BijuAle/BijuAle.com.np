
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-js": preferDefault(require("/home/biju/GitHub/a/blog/src/pages/404.js")),
  "component---src-templates-all-posts-js": preferDefault(require("/home/biju/GitHub/a/blog/src/templates/AllPosts.js")),
  "component---src-templates-all-tagged-posts-js": preferDefault(require("/home/biju/GitHub/a/blog/src/templates/AllTaggedPosts.js")),
  "component---src-templates-single-page-js": preferDefault(require("/home/biju/GitHub/a/blog/src/templates/SinglePage.js")),
  "component---src-templates-single-post-js": preferDefault(require("/home/biju/GitHub/a/blog/src/templates/SinglePost.js"))
}

