import React from "react"
import styled from "styled-components"
import { BlogTitle, BlogTag } from "./Typography"

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
        <BlogTag>Quia Anima Christi</BlogTag>
      </BlogTitle>
    </NavWrapper>
  )
}
