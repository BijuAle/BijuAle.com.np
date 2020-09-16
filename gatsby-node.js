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
              collection
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

  if (data.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  //Create paginated pages for post
  const postPerPage = 4
  const postEdges = data.allMdx.edges.filter(
    edge => edge.node.fields.collection === "posts"
  )
  const numPages = Math.ceil(postEdges.length / postPerPage)
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
  postEdges.forEach((edge, index) => {
    const slug = edge.node.fields.slug
    const id = edge.node.id
    const previous = index === 0 ? null : postEdges[index - 1].node
    const next =
      index === postEdges.length - 1 ? null : postEdges[index + 1].node
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/singlePost.js"),
      context: { id, previous, next },
    })
  })

  //Create Individual Page
  const pageEdges = data.allMdx.edges.filter(
    edge => edge.node.fields.collection === "mdxpages"
  )
  pageEdges.forEach(edge => {
    const slug = edge.node.fields.slug
    const id = edge.node.id
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/page.js"),
      context: { id },
    })
  })

  // Extract tag data from query
  const tags = data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    actions.createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: require.resolve("./src/templates/singleTag.js"),
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

//Add slug & collection attrubutes
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const parent = getNode(_.get(node, "parent"))
    const parentName = _.get(parent, "sourceInstanceName")
    const slug = createFilePath({ node, getNode, basePath: parentName })
    console.log(slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `collection`,
      value: parentName,
    })
  }
}

// Register Menus in siteMetaData
exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions
  createFieldExtension({
    name: `defaultArray`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return []
          }
          return source[info.fieldName]
        },
      }
    },
  })
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
      subMenu: [SubMenu] @defaultArray
    }
    type SubMenu {
      name: String
      link: String
    }
  `
  createTypes(typeDefs)
}
