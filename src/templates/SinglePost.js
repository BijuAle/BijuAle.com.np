import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout, SEO } from "../components"
import kebabCase from "lodash/kebabCase"
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
        author
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`
const singlePost = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} />
      <div style={{ fontSize: "1.3rem" }}>
        <b>{data.mdx.frontmatter.title}</b>
      </div>
      <div style={{ marginBottom: "1rem", opacity: "70%", fontSize: ".95rem" }}>
        <div>
          {data.mdx.frontmatter.author}&nbsp;|&nbsp;{data.mdx.frontmatter.date}
          &nbsp;|&nbsp;
          {data.mdx.frontmatter.tags.map(tag => (
            <span key={tag}>
              <Link to={`/tags/${kebabCase(tag)}/`}>{tag}&nbsp;</Link>
            </span>
          ))}
        </div>
      </div>
      <MDXProvider>
        <MDXRenderer headings={data.mdx.headings}>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
            marginTop: `.5rem`,
          }}
        >
          <div
            style={{
              opacity: `90%`,
              fontStyle: `italic`,
              float: `right`,
            }}
          >
            Other Posts:
          </div>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default singlePost
