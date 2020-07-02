import React from "react"
import styled from "styled-components"
import { StyledLink } from "./Typography"

const MenuWrapper = styled.div``
export const Menu = ({ menuLinks }) => (
  <MenuWrapper>
    <nav>
      <ul style={{ display: "flex" }}>
        {menuLinks.map(link => (
          <li
            key={link.name}
            style={{
              listStyleType: `none`,
              padding: `.3rem`,
              textTransform: `uppercase`,
            }}
          >
            <StyledLink size="xSmall" fontFamily="specialElite" to={link.link}>
              {link.name}
            </StyledLink>
          </li>
        ))}
      </ul>
    </nav>
  </MenuWrapper>
)
