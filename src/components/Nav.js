import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { BlogTitle, BlogTag } from "./Typography"
import { Menu } from "../components"

const NavWrapper = styled.nav`
  grid-column: 4 / span 12;
  grid-row: auto;
  display: flex;
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.colors.darkBg};
  z-index: 100;
`

export const Nav = () => {
  return (
    <NavWrapper>
      <BlogTitle to="/">
        Biju Ale
        <BlogTag></BlogTag>
      </BlogTitle>
      <StaticQuery
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
      />
    </NavWrapper>
  )
}
