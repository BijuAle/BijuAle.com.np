module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":650,"linkImagesToOriginal":true,"showCaptions":false,"markdownCaptions":false,"backgroundColor":"white","quality":50,"withWebp":false,"tracedSVG":false,"loading":"lazy","decoding":"async","disableBgImageOnAlpha":false,"disableBgImage":false},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"gatsbyRemarkPlugins":[{"resolve":"/home/biju/GitHub/a/blog/node_modules/gatsby-remark-images","id":"4ee03d67-61da-5c6a-9c47-ca3726d1f687","name":"gatsby-remark-images","version":"6.0.0","modulePath":"/home/biju/GitHub/a/blog/node_modules/gatsby-remark-images/index.js","pluginOptions":{"plugins":[],"linkImagesToOriginal":false,"withWebp":true,"backgroundColor":"transparent"},"nodeAPIs":["pluginOptionsSchema"],"browserAPIs":["onRouteUpdate"],"ssrAPIs":[]}],"extensions":[".mdx"],"defaultLayouts":{},"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/home/biju/GitHub/a/blog"},
    },{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"linkImagesToOriginal":false,"withWebp":true,"backgroundColor":"transparent"},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Biju's Blog","short_name":"BijuBlog","description":"This is Biju Ale's Blog & Personal Website.","start_url":"/","background_color":"#1A202C","theme_color":"#1A202C","display":"standalone","icon":"./src/images/eagle-head.png","cache_busting_mode":"none","legacy":true,"theme_color_in_head":true,"crossOrigin":"anonymous","include_favicon":true,"cacheDigest":null},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
