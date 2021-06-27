import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { BlogTitle, BlogTag } from "../Typography"
import { Menu, StyledLink } from ".."
import background from "../../images/background/green_cup.png"

const NavWrapper = styled.nav`
  grid-column: 4 / span 8;
  display: flex;
  flex-direction: column;
  grid-row: 1 / span 1;
  display: flex;
  position: sticky;
  top: 0;
  background-image: url(${background});
  z-index: 10;
  padding-top: 1rem;
  padding-left: 0.8rem;
  box-shadow: inset 15px 15px 15px -15px rgba(0, 0, 0, 0.5);
  border-bottom: 0.5px solid #ce8989;
  border-bottom-left-radius: 5%;
`
export const Header = () => {
  return (
    <NavWrapper>
      <StyledLink to="/">
        <BlogTitle title="Home">Biju Ale</BlogTitle>
      </StyledLink>
      <BlogTag>
        "And ye shall know the truth, and the truth shall make you free."
        <em>-John 8:32</em>
      </BlogTag>
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
                menuLinks {
                  name
                  link
                  subMenu {
                    name
                    link
                  }
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
