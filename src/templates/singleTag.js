import React from "react"
import { Link, graphql } from "gatsby"
import { PostTitle, SEO, Layout, Content, Post } from "../components"
import { Date } from "../components/Typography"

export const pageQuery = graphql`
  query($tag: String) {
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

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <SEO />
      <Content>
        <Post>
          <PostTitle
            margin="2.5rem 0 2rem 0"
            fontSize="1.55rem"
            textAlign="center"
            color="#465440"
          >
            {tagHeader}
          </PostTitle>
          <ul>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const { title } = node.frontmatter
              return (
                <li key={slug}>
                  <Link to={slug}>
                    {title}{" "}
                    <Date float="right" display="inline">
                      {node.frontmatter.date}
                    </Date>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link to="/tags">All Posts</Link>
        </Post>
      </Content>
    </Layout>
  )
}

export default Tags
