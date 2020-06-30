import styled from "styled-components"
import { Link } from "gatsby"
import "../fonts/fonts.css"

const fontSizes = {
  medium: "1.125rem",
  Small: "1rem",
  small: ".82rem",
  xSmall: "0.8rem",
  big: "1.67rem",
  bigger: "2.5em",
  default: "1.125rem",
  inherit: "1em",
}

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: gray;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: aqua;
    transition: 3s;
  }
  font-size: ${props => fontSizes[props.size] || fontSizes["default"]};
`

export const BlogTitle = styled(Link)`
  text-decoration: none;
  color: gray;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: red;
    transition: 5s;
  }
  font-size: ${props => fontSizes[props.size] || fontSizes["bigger"]};
  font-family: "Emirose";
`

export const BlogTag = styled.p`
  text-decoration: none;
  color: gray;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  font-size: ${props => fontSizes[props.size] || fontSizes["small"]};
  font-family: "Cinzel Decorative";
`

export const P = styled.p`
  font-size: ${props => fontSizes[props.size] || fontSizes["default"]};
`
export const Meta = styled.p`
  font-size: ${props => fontSizes[props.size] || fontSizes["default"]};
  font-family: "Shadows Into Light Two";
`
export const H1 = styled.h1`
  font-size: ${props => fontSizes[props.size] || fontSizes["big"]};
  font-family: "Special Elite";
  font-weight: 200;
`
