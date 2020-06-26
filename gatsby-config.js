module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Biju's Blog`,
        short_name: `Biju's Blog`,
        start_url: `/`,
        background_color: `#1a202c`,
        theme_color: `#6b37bf`,
        display: `standalone`,
        icon: `src/images/favicon/eagle-head.jpeg`,
        crossOrigin: `use-credentials`,
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
            maxWidth: 545,
          },
        },
      ],
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`EB Garamond`, `roboto-mono`],
        display: `swap`,
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}
