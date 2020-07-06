import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { H1 } from "../components/Typography"
import { Container, Content, Post, SEO } from "../components"

const page = ({ data }) => {
  return (
    <Container>
      <SEO />
      <Content>
        <Post>
          <H1>{data.mdx.frontmatter.title}</H1>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Post>
      </Content>
    </Container>
  )
}

export default page

export const pageQuery = graphql`
  query pageQuery($id: String) {
    mdx(id: { eq: $id }, fileAbsolutePath: { regex: "/(pages)/.*.mdx/" }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      body
    }
  }
`
