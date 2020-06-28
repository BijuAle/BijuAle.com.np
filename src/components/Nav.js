import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const NavWrapper = styled.nav`
  grid-column: 2 / span 12;
  grid-row: 1/2;
  display: flex;
  align-items: center;
`

export const Nav = () => {
  return (
    <NavWrapper>
      <Link to="/">Biju Ale</Link>
    </NavWrapper>
  )
}
