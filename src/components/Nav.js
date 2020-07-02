import React from "react"
// import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { BlogTitle, BlogTag } from "./Typography"
// import { Menu } from "../components"

const NavWrapper = styled.nav`
  grid-column: 4 / span 12;
  grid-row: 1/2;
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

export const Nav = () => {
  return (
    <NavWrapper>
      <BlogTitle to="/">
        Biju Ale
        <BlogTag></BlogTag>
      </BlogTitle>
      {/* <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
                menuLinks {
                  name
                  link
                }
              }
            }
          }
        `}
        render={data => (
          <React.Fragment>
            <Menu menuLinks={data.site.siteMetadata.menuLinks} />
          </React.Fragment>
        )}
      /> */}
    </NavWrapper>
  )
}
