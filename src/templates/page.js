import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { H1 } from "../components/Typography"
import { Container, Content, Post, SEO, ExternalLink } from "../components"
import { MDXProvider } from "@mdx-js/react"

export const query = graphql`
  query($id: String) {
    site {
      siteMetadata {
        author
      }
    }
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
      excerpt
    }
  }
`
const page = ({ data }) => {
  return (
    <Container>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        author={data.site.siteMetadata.author}
      />
      <Content>
        <Post>
          <H1>{data.mdx.frontmatter.title}</H1>
          <MDXProvider components={ExternalLink}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </MDXProvider>
        </Post>
      </Content>
    </Container>
  )
}

export default page
