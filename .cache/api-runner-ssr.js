var plugins = [{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Biju's Blog","short_name":"BijuBlog","description":"This is Biju Ale's Blog & Personal Website.","start_url":"/","background_color":"#1A202C","theme_color":"#1A202C","display":"standalone","icon":"./src/images/favicon/eagle-head.png","cache_busting_mode":"none","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":null},
    },{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"extension":["md","mdx"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":1000,"quality":100,"linkImagesToOriginal":false,"backgroundColor":"transparent"}},"gatsby-remark-slug",{"resolve":"gatsby-remark-highlight-code","options":{"terminal":"carbon","theme":"night-owl","lineNumbers":true}},{"resolve":"gatsby-remark-katex","options":{"strict":"ignore"}}]},
    },{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-prefetch-google-fonts/gatsby-ssr'),
      options: {"plugins":[],"fonts":[{"family":"Josefin Slab"},{"family":"Goudy Bookletter 1911"}]},
    },{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-122354089-1","head":true},
    },{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-feed-mdx/gatsby-ssr'),
      options: {"plugins":[],"query":"\n            {\n              site {\n                siteMetadata {\n                  title\n                  description\n                  siteUrl\n                  site_url: siteUrl\n                }\n              }\n            }\n          ","feeds":[{"query":"{\n              allMdx {\n                edges {\n                  node {\n                    frontmatter {\n                      date(formatString: \"MM DD YYYY\")\n                      tags\n                      title\n                    }\n                    excerpt\n                    fields {\n                      slug\n                    }\n                  }\n                }\n              }\n            }","output":"/rss.xml","title":"a's RSS Feed","match":"^/pages/"}]},
    },{
      plugin: require('/home/biju/GitHub/blog/node_modules/gatsby-plugin-remove-generator/gatsby-ssr'),
      options: {"plugins":[],"removeVersionOnly":true,"content":"Biju Ale"},
    },{
      plugin: require('/home/biju/GitHub/blog/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
