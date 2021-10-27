require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "Biju Ale",
    description: "Biju Ale's Blog & Personal Website.",
    url: "https://bijuale.com.np",
    siteUrl: "https://bijuale.com.np",
    image: "",
    author: "Biju Ale",
    keywords:
      "Philosophy, Christian, Website, Biju, Ale, Biju Ale, Nepal, USA, Biola, Theology",
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              withWebp: true,
              backgroundColor: `transparent`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Biju's Blog`,
        short_name: `BijuBlog`,
        description: `This is Biju Ale's Blog & Personal Website.`,
        start_url: `/`,
        background_color: `#1A202C`,
        theme_color: `#1A202C`,
        display: `standalone`,
        icon: `./src/images/eagle-head.png`,
        cache_busting_mode: "none",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/mdxpages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
