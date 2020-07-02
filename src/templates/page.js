/* import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { H1, Date } from "../components/Typography"
import { Container, Post, SEO } from "../components"

const singlePage = ({ data }) => {
  return (
    <Container>
      <SEO
        title={data.mdx.frontmatter.title}
        author={data.mdx.frontmatter.author}
      />
      <Post>
        <H1>{data.mdx.frontmatter.title}</H1>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Post>
    </Container>
  )
}

export default singlePost

export const pageQuery = graphql`
  query singlePostQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      excerpt
    }
  }
`
 */
