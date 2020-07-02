import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { H1, Date } from "../components/Typography"
import { Container, Content, Post, SEO } from "../components"

const singlePost = ({ data }) => {
  return (
    <Container>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        author={data.mdx.frontmatter.author}
      />
      <Content>
        <Post>
          <H1>{data.mdx.frontmatter.title}</H1>
          <Date size="date">{data.mdx.frontmatter.date}</Date>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Post>
      </Content>
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
