import React from "react"
import { StyledLink } from "./Typography"

export const Menu = ({ menuLinks }) => (
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
          <StyledLink size="small" fontFamily="josefinSlab" to={link.link}>
            {link.name}
          </StyledLink>
        </li>
      ))}
    </ul>
  </nav>
)
