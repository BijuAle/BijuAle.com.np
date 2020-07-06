import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

export const BlogTitle = styled.p`
  text-decoration: none;
  color: gray;
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
    color: gold;
    transition: 2s;
    cursor: pointer;
  }

  &:not(:hover) {
    transition: 2s;
  }

  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
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
  text-align: ${props => props.textAlign};
  color: #8a865f;
  font-style: ${props => props.fontStyle};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`
