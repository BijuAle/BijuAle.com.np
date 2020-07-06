import React from "react"
import styled from "styled-components"
import { StyledLink } from "./Typography"

const MenuWrapper = styled.div`
  font-family: "Josefin Slab";
  margin-top: 0.8rem;
  margin-bottom: 0.6rem;
`
export const Menu = ({ menuLinks }) => (
  <MenuWrapper>
    <nav>
      <ul style={{ display: "flex", fontSize: ".8em" }}>
        {menuLinks.map(link => (
          <li
            key={link.name}
            style={{
              listStyleType: `none`,
              padding: `0 .3rem 0 0`,
              marginLeft: `.3rem`,
              textTransform: `uppercase`,
            }}
          >
            <StyledLink to={link.link}>{link.name}</StyledLink>
          </li>
        ))}
      </ul>
    </nav>
  </MenuWrapper>
)
