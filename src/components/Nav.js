import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { BlogTitle, BlogTag } from "./Typography"
import { Menu, StyledLink } from "../components"

const NavWrapper = styled.nav`
  grid-column: 4 / span 8;
  display: flex;
  flex-direction: column;
  grid-row: 1 / span 1;
  display: flex;
  position: sticky;
  top: 0;
  background-color: inherit;
  z-index: 100;
  padding-top: 1rem;
  padding-left: 0.8rem;
  box-shadow: inset 15px 15px 15px -15px rgba(0, 0, 0, 0.5);
  border-bottom: 0.5px dotted black;
  border-bottom-left-radius: 5%;
`
export const Nav = () => {
  return (
    <NavWrapper>
      <StyledLink to="/">
        <BlogTitle>Biju Ale</BlogTitle>
      </StyledLink>
      <BlogTag>Cudendum christologicam mentem</BlogTag>
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
