import React from "react"
import styled from "styled-components"

const fontSizes = {
  medium: "1.125rem",
  Small: "1rem",
  small: ".82rem",
  xSmall: "0.8rem",
  big: "1.7rem",
  bigger: "2.5em",
  default: "1.125rem",
  inherit: "1em",
}
const fontFamilies = {
  adobeCaslonPro: "Adobe Caslon Pro",
  josefinSlab: "Josefin Slab",
  specialElite: "Special Elite",
  shadowsIntoLightTwo: "Shadows Into Light Two",
}
const FooterWrapper = styled.footer`
  grid-column: 2 / span 12;
  display: flex;
  background-color: #1a202c;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: ${props => fontSizes[props.size] || fontSizes["default"]};
  font-family: ${props =>
    fontFamilies[props.fontFamily] || fontFamilies["josefinSlab"]};
`

export const Footer = () => {
  return (
    <FooterWrapper size="small">
      Biju Ale © 2017 {new Date().getFullYear()} - All Rights Reserved.
    </FooterWrapper>
  )
}
