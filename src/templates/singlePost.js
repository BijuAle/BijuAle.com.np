import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { H1, Date } from "../components/Typography"
import { Container, Content, Post, SEO } from "../components"

const singlePost = ({ data }) => {
  const date_ = data.mdx.frontmatter.data
  const tags_ = data.mdx.frontmatter.tags

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
          <Date textAlign="center" fontFamily="Josefin Slab" fontSize=".85em">
            {data.mdx.frontmatter.date}&nbsp;|&nbsp;
            {data.mdx.frontmatter.tags.join(`, `)}
          </Date>
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
        tags
      }
      excerpt
    }
  }
`
