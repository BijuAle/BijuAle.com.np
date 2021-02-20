module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Biju's Blog","short_name":"BijuBlog","description":"This is Biju Ale's Blog & Personal Website.","start_url":"/","background_color":"#1A202C","theme_color":"#1A202C","display":"standalone","icon":"./src/images/favicon/eagle-head.png","cache_busting_mode":"none","legacy":true,"theme_color_in_head":true,"crossOrigin":"anonymous","include_favicon":true,"cacheDigest":null},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"extension":["md","mdx"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":1000,"quality":100,"linkImagesToOriginal":false,"backgroundColor":"transparent"}},"gatsby-remark-slug",{"resolve":"gatsby-remark-highlight-code","options":{"terminal":"carbon","theme":"night-owl","lineNumbers":true}},{"resolve":"gatsby-remark-katex","options":{"strict":"ignore"}}]},
    },{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":1000,"quality":100,"linkImagesToOriginal":false,"backgroundColor":"transparent","showCaptions":false,"markdownCaptions":false,"sizeByPixelDensity":false,"withWebp":false,"tracedSVG":false,"loading":"lazy","disableBgImageOnAlpha":false,"disableBgImage":false},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":"UA-122354089-1","head":true,"anonymize":false,"respectDNT":false,"exclude":[],"pageTransitionDelay":0},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
