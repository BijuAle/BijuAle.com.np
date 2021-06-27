import React from "react"
import kebabCase from "lodash/kebabCase"
import { graphql } from "gatsby"
import { MemoryLink } from "../components"
// import Loadable from "@loadable/component"

import {
  StyledLink,
  SEO,
  Layout,
  Content,
  Post,
  PostTitle,
} from "../components"

export const data = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

const TagsPage = ({
  data: {
    allMdx: { group },
  },
}) => (
  <Layout>
    <SEO />
    <Content>
      <Post>
        <StyledLink margin="0" alt="Go To Home" title="Go To Home" to={"/"}>
          &#8962; ← Home
        </StyledLink>
        <PostTitle
          margin="2.5rem 0 0 0"
          fontSize="1.55rem"
          textAlign="center"
          color="#5e6b58"
        >
          Essays
        </PostTitle>
        Tags:
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue} style={{ listStyle: "none" }}>
              <MemoryLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </MemoryLink>
            </li>
          ))}
        </ul>
      </Post>
    </Content>
  </Layout>
)

export default TagsPage
