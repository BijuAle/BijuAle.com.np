import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

export const BlogTitle = styled.p`
  text-decoration: none;
  color: #676767;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  font-size: ${props => props.fontSize || "2.5rem"};
  font-family: "Josefin Slab";
`
export const BlogTag = styled.p`
  font-size: "1.5em";
  font-family: "Josefin Slab";
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
    color: darkkhaki;
    transition: 0.5s;
    cursor: pointer;
  }

  &:not(:hover) {
    transition: 0.5s;
  }

  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`
export const H1 = styled.h1`
  font-size: ${props => props.fontSize};
  font-family: "Goudy Bookletter 1911";
  font-weight: 400;
  line-height: ${props => props.lineHeight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`
export const P = styled.p`
  font-size: ${props => props.fontSize};
  font-family: ${props => props.fontFamily};
  text-align: justify;
  line-height: ${props => props.lineHeight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  color: ${props => props.color};
`
export const Date = styled.div`
  font-size: ${props => props.fontSize};
  font-family: ${props => props.fontFamily};
  font-style: italic;
  text-align: ${props => props.textAlign};
  color: #676363;
  font-style: ${props => props.fontStyle};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`
const BlackHover = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: gray;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: gold;
    transition: 1s;
    cursor: pointer;
    background-color: black;
  }

  &:not(:hover) {
    transition: 0.5s;
  }

  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`

export const Tags = styled(BlackHover)`
  color: #676363;
  font-style: italic;
  &:hover {
    color: gold;
    background-color: black;
  }
`

export const Nav = styled(BlackHover)`
  &:hover {
    transition: 0.5s;
  }

  &:not(:hover) {
    transition: 0.5s;
  }
`
