import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { PostTitle, StyledLink, Date, Tags } from "../components/Typography"
import { Container, Content, Post, SEO, TOC } from "../components"
import { MDXProvider } from "@mdx-js/react"
import kebabCase from "lodash/kebabCase"
require(`katex/dist/katex.min.css`)

export const query = graphql`
  query($id: String) {
    site {
      siteMetadata {
        author
      }
    }
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
      }
      fields {
        slug
      }
      excerpt
    }
  }
`
const page = ({ data }) => {
  let ComputingSlugRegex = new RegExp("/educational/computing/(.*)/")
  var isComputingPage = ComputingSlugRegex.test(data.mdx.fields.slug)
  return (
    <Container>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        author={data.site.siteMetadata.author}
      />
      <Content>
        <Post>
          {isComputingPage ? (
            <PostTitle
              margin="2.5rem 0 0 0"
              color="#5e6b58"
              fontSize="1.55rem"
              textAlign="center"
            >
              {data.mdx.frontmatter.title}
            </PostTitle>
          ) : (
            <PostTitle
              margin="2.5rem 0 1rem 0"
              color="#5e6b58"
              fontSize="1.55rem"
              textAlign="center"
            >
              {data.mdx.frontmatter.title}
            </PostTitle>
          )}
          {isComputingPage ? (
            <Date
              margin="0 0 2rem 0 "
              textAlign="center"
              fontFamily="Josefin Slab"
              fontSize=".85em"
            >
              {data.mdx.frontmatter.date}&nbsp;|&nbsp;
              {data.mdx.frontmatter.tags.map(tag => (
                <span
                  style={{
                    margin: "0 .2em 0 0",
                    padding: ".18em",
                    borderRadius: "10%",
                    border: "1px solid #131313",
                  }}
                  key={tag}
                  fontSize=".8em"
                >
                  <Tags to={`/tags/${kebabCase(tag)}/`}>{tag}</Tags>
                </span>
              ))}
            </Date>
          ) : null}
          <MDXProvider components={{ TOC }}>
            <MDXRenderer headings={data.mdx.headings}>
              {data.mdx.body}
            </MDXRenderer>
          </MDXProvider>
          {isComputingPage ? (
            <StyledLink to="/educational/computing">
              ← All Computing Posts
            </StyledLink>
          ) : null}
        </Post>
      </Content>
    </Container>
  )
}

export default page
