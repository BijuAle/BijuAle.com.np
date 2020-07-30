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

  &:hover {
    color: #5c9a36;
    transition: 1s;
    cursor: pointer;
  }

  &:not(:hover) {
    transition: 1s;
  }
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
    color: green;
    transition: 0.5s;
    cursor: pointer;
  }

  &:not(:hover) {
    transition: 0.5s;
  }

  font-size: inherit;
  font-family: ${props => props.fontFamily || "inherit"};
  font-weight: ${props => props.fontWeight || "inherit"};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  color: ${props => props.color || "inherit"};
`
export const PostTitle = styled.span`
  font-size: ${props => props.fontSize};
  font-family: "Goudy Bookletter 1911";
  font-weight: 400;
  line-height: ${props => props.lineHeight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  color: ${props => props.color || "inherit"};
  text-align: ${props => props.textAlign};
  display: block;
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
  color: #676363;
  font-style: ${props => props.fontStyle};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  display: ${props => props.display};
  float: ${props => props.float};
`
export const BlackHover = styled(props => <Link {...props} />)`
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
  font-family: "Josefin Slab";
  font-size: ${props => props.fontSize};
  color: "#676363";
`

export const Nav = styled(BlackHover)`
  &:hover {
    transition: 0.5s;
  }

  &:not(:hover) {
    transition: 0.5s;
  }
`
