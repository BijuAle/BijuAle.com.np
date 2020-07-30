module.exports = {
  siteMetadata: {
    title: "Biju's Blog",
    description: "Welcome to Biju Ale's Blog & Personal Website.",
    url: "https://bijuale.com.np",
    siteUrl: "https://bijuale.com.np",
    image: "",
    author: "Biju Ale",
    menuLinks: [
      {
        name: "Posts",
        link: "/tags",
        subMenu: [],
      },
      {
        name: "Projects",
        link: "/projects",
        subMenu: [],
      },
      {
        name: "Educational",
        link: "/educational",
        subMenu: [
          {
            name: `Philosophy`,
            link: `/educational/philosophy`,
          },
          {
            name: `Mathematics`,
            link: `/educational/mathematics`,
          },
          {
            name: `Computing`,
            link: `/educational/computing`,
          },
          {
            name: `General`,
            link: `/educational/general`,
          },
        ],
      },
      {
        name: "Gallery",
        link: "/gallery",
        subMenu: [],
      },
      {
        name: "Contact",
        link: "/contact",
        subMenu: [],
      },
      {
        name: "About",
        link: "/about",
        subMenu: [],
      },
    ],
  },
  plugins: [
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
        icon: `./src/images/favicon/eagle-head.png`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdxpages`,
        path: `${__dirname}/src/mdxpages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `static`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extension: [`md`, `mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              quality: 100,
              linkImagesToOriginal: false,
              backgroundColor: "transparent",
            },
          },
          `gatsby-remark-slug`,
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: "carbon",
              theme: "night-owl",
              lineNumbers: true,
            },
          },
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
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Josefin Slab`,
          },
          {
            family: `Goudy Bookletter 1911`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-slug`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              quality: 100,
              linkImagesToOriginal: false,
              backgroundColor: "transparent",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {},
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-122354089-1",
        head: true,
      },
    },
    `gatsby-plugin-offline`,
    // `gatsby-plugin-remove-serviceworker`,
    {
      resolve: "gatsby-plugin-netlify-cache",
      options: {
        cachePublic: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `{
              allMdx {
                edges {
                  node {
                    frontmatter {
                      date(formatString: "MM DD YYYY")
                      tags
                      title
                    }
                    excerpt
                    fields {
                      slug
                    }
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: `a's RSS Feed`,
            match: "^/pages/",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-remove-generator",
      options: {
        removeVersionOnly: true,
        content: "Biju Ale",
      },
    },
    `gatsby-plugin-catch-links`,
  ],
}
