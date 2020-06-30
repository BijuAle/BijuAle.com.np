import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { H1, P } from "../components/Typography"
import { Container, Post } from "../components"

const singlePost = ({ data }) => {
  return (
    <Container>
      <Post>
        <H1>{data.mdx.frontmatter.title}</H1>
        <P size="xSmall">{data.mdx.frontmatter.date}</P>
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
