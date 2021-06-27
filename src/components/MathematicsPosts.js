import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Date, StyledLink } from "./Typography"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

const MathematicsPosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: {
          fields: { collection: { eq: "mdxpages" } }
          fileAbsolutePath: {
            regex: "/mdxpages/educational/mathematics/(?!index)/"
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              tags
              date(formatString: "MMMM DD YYYY")
            }
            body
          }
        }
      }
    }
  `)
  const edges = data.allMdx.edges
  return (
    <div>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <StyledLink to={slug}>{title}</StyledLink>
              <Date
                fontStyle="italic"
                fontFamily="Josefin Slab"
                fontSize=".85em"
              >
                {node.frontmatter.date}
              </Date>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default MathematicsPosts
