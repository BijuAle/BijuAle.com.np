import React from "react"
import { graphql } from "gatsby"
import { Container, Content, Card, Pagination, SEO } from "../components"

export const pageQuery = graphql`
  query AllPostQuery($skip: Int!, $limit: Int!) {
    allMdx(
      skip: $skip
      limit: $limit
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/(posts)/.*.mdx/" } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
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
  }
`
const allPosts = ({ pageContext, data }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/${currentPage - 1}`
  const nextPage = `/${currentPage + 1}`
  const posts = data.allMdx.edges
  return (
    <Container>
      <SEO />
      <Content>
        {posts.map(post => (
          <Card
            key={post.node.fields.slug}
            date={post.node.frontmatter.date}
            title={post.node.frontmatter.title}
            excerpt={post.node.excerpt}
            slug={post.node.fields.slug}
            tags={post.node.frontmatter.tags}
          />
        ))}
        <Pagination
          isFirst={isFirst}
          isLast={isLast}
          prevPage={prevPage}
          nextPage={nextPage}
          currentPage={currentPage}
          numPages={numPages}
        />
      </Content>
    </Container>
  )
}
export default allPosts
