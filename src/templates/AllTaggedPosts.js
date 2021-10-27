import React from "react"
import { Link, graphql } from "gatsby"
import { Layout, TagList, SEO } from "../components"

export const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM  DD YYYY")
          }
        }
      }
    }
  }
`

const AllTaggedPosts = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} essay${
    totalCount === 1 ? "" : "s"
  } under "${tag}"`

  return (
    <Layout>
      <SEO title="Tagged Essays" />

      <Link to="/">←</Link>
      <div>{tagHeader}</div>
      <ul style={{ marginTop: "1rem" }}>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
              <span style={{ float: "right", opacity: "50%" }}>
                {node.frontmatter.date}
              </span>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default AllTaggedPosts
