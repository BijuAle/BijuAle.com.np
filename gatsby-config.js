module.exports = {
  plugins: [
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
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: [`md`, `mdx`],
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          option: {
            maxWidth: 1200,
          },
        },
      ],
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`EB Garamond`, `roboto-mono`],
        display: "swap",
      },
    },
  ],
}
