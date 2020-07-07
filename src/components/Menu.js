import React from "react"
import styled from "styled-components"
import { Nav } from "./Typography"

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
            <Nav to={link.link}>{link.name}</Nav>
          </li>
        ))}
      </ul>
    </nav>
  </MenuWrapper>
)
