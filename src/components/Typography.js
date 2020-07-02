import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import "../fonts/fonts.css"

const fontSizes = {
  medium: "1.125rem",
  xSmall: "0.8rem",
  small: ".82rem",
  Small: "1rem",
  big: "1.32rem",
  bigger: "2.5em",
  default: "1.125rem",
  inherit: "1em",
  date: ".7em",
}
const fontFamilies = {
  adobeCaslonPro: "Adobe Caslon Pro",
  josefinSlab: "Josefin Slab",
  specialElite: "Special Elite",
  shadowsIntoLightTwo: "Shadows Into Light Two",
  emirose: "Emirose",
}

export const BlogTitle = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: gray;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  font-size: ${props => fontSizes[props.size] || fontSizes["bigger"]};
  font-family: ${props =>
    fontFamilies[props.fontFamily] || fontFamilies["josefinSlab"]};
`
export const BlogTag = styled.p`
  text-decoration: none;
  color: gray;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover:after {
    opacity: 1;
    transition-delay: 0.2s;
  }
  /*  &:after {
    opacity: 0;
    transition: 2s all;
    content: "Forging Christ-centered Mind";
  } */
  &:before {
    content: "Cudendum christologicam mentem";
    opacity: 1;
    transition: 2s all;
  }
  /*   &:hover:before {
    transition: 2s all;
    content: "";

    &:not(&:hover) {
      transition: 2s;
    }
  } */

  font-size: ${props => fontSizes[props.size] || fontSizes["medium"]};
  font-family: ${props =>
    fontFamilies[props.fontFamily] || fontFamilies["josefinSlab"]};
`

export const StyledLink = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: gray;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: yellow;
    transition: 2s;
    cursor: pointer;
  }

  &:not(:hover) {
    transition: 2s;
  }

  font-size: ${props => fontSizes[props.size] || fontSizes["default"]};
  font-family: ${props =>
    fontFamilies[props.fontFamily] || fontFamilies["specialElite"]};
  font-weight: ${props => props.fontWeight};
`
export const H1 = styled.h1`
  font-size: ${props => fontSizes[props.size] || fontSizes["big"]};
  font-family: ${props =>
    fontFamilies[props.fontFamily] || fontFamilies["specialElite"]};
  font-weight: 200;
`
export const P = styled.p`
  font-size: ${props => fontSizes[props.size] || fontSizes["default"]};
  font-family: ${props =>
    fontFamilies[props.fontFamily] || fontFamilies["josefinSlab"]};
  margin-bottom: 2rem;
`
export const Date = styled.div`
  font-size: ${props => fontSizes[props.size] || fontSizes["date"]};
  font-family: ${props =>
    fontFamilies[props.fontFamily] || fontFamilies["shadowsIntoLightTwo"]};
  font-weight: 400;
  padding-bottom: 0.8em;
`
