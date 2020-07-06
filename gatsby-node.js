const _ = require("lodash")

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            excerpt(pruneLength: 300)
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              tags
            }
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  // handle errors
  if (data.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  //Create paginated pages for post
  const postPerPage = 5
  const numPages = Math.ceil(data.allMdx.edges.length / postPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: require.resolve("./src/templates/allPosts.js"),
      context: {
        limit: postPerPage,
        skip: i * postPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  //Create Individual Blog Post
  data.allMdx.edges.forEach(edge => {
    const slug = edge.node.fields.slug
    const id = edge.node.id
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/singlePost.js"),
      context: { id },
    })
  })

  // Extract tag data from query
  const tags = data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    actions.createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: require.resolve("./src/templates/tags.js"),
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
//Generate Slug during new page creation
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Regiser Menus in siteMetaData
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Site implements Node {
      siteMetadata: SiteMetadata
    }
    type SiteMetadata {
      menuLinks: [MenuLinks]!
    }
    type MenuLinks {
      name: String!
      link: String!
      subMenu: [SubMenu]
    }
    type SubMenu {
      name: String
      link: String
    }
  `
  createTypes(typeDefs)
}
