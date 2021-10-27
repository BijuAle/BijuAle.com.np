import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout, SEO } from "../components"
import { MDXProvider } from "@mdx-js/react"

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      headings {
        depth
        value
      }
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        author
      }
      fields {
        slug
      }
      excerpt
    }
  }
`

const SinglePage = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} />
      <MDXProvider>
        <MDXRenderer headings={data.mdx.headings}>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export default SinglePage
