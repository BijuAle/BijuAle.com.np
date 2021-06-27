import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { MemoryLink } from "../components"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

const ComputingPosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: {
          fields: { collection: { eq: "mdxpages" } }
          fileAbsolutePath: {
            regex: "/mdxpages/educational/computing/(?!index)/"
          }
        }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  return (
    <div>
      Tags:
      <ul>
        {data.allMdx.group.map(tag => (
          <li key={tag.fieldValue} style={{ listStyle: "none" }}>
            <MemoryLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </MemoryLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ComputingPosts
