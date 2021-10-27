import React from "react"
import styled from "styled-components"

export const Footer = () => {
  const FooterStyle = styled.div`
    margin: 0.5rem 0 0.5rem 0;
    opacity: 60%;
    font-size: 0.8rem;
  `
  return (
    <FooterStyle>
      <footer>
        <hr />
        Biju Ale © 2017 {new Date().getFullYear()}&nbsp; All Rights Reserved
      </footer>
    </FooterStyle>
  )
}
