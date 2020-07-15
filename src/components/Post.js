import styled from "styled-components"
import React from "react"

const PostWrapper = styled.main`
  grid-column: 4/12;
  margin-top: 2rem;
  margin-bottom: 4rem;
  margin-left: 1rem;
  font-family: "Goudy Bookletter 1911";
  text-align: justify;
  text-justify: auto;

  li {
    margin: 0.2rem 0;
  }
  p {
    /* font-size: 1em; */
    margin: 0 0 1em 0;
    font-size: 1.06em;
    line-height: 1.09em;
  }
  p:nth-of-type(1) {
    margin-top: 1.5em;
  }
  p:nth-of-type(1)::first-letter {
    font-family: "Josefin Slab";
    font-size: 400%;
    font-style: italic;
    color: #310a4e;
    text-shadow: -1px -1px 0 darkslategray, 1px -1px 0 black, -1px 1px 0 black,
      1px 1px 0 black;
    initial-letter: 2;
    line-height: 1;
    float: left;
    padding: 0 0.23em 0 0;
  }
  p:not(:nth-of-type(1)) {
    margin-top: 1rem;
  }
  p::-moz-selection {
    background: slategray;
  }
  p::selection {
    background: slategray;
  }
  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
  del {
    text-decoration: line-through;
  }
  h1 {
    font-family: "Goudy Bookletter 1911";
    font-size: 1.3em;
    font-weight: 200;
    line-height: 1.1;
    margin-bottom: 0.4rem;
  }
  h1:nth-of-type(1) {
    font-family: "Goudy Bookletter 1911";
    font-size: 1.55em;
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 0rem;
    margin-bottom: 0rem;
  }
  h1:nth-of-type(2) {
    margin-top: 1rem;
  }

  h2 > P {
    margin: 0;
  }
  h2 {
    font-size: 1em;
    font-weight: 200;
  }
  ul,
  ol {
    margin: 1rem 0 1rem 2rem;
  }
  li {
    /* margin: 0.2rem 0; */
    margin: 4em 0 0 0;
  }
  blockquote {
    font-size: 1.1em;
    line-height: 1.15em;
    margin-left: 2rem;
    color: #6d6d4f;
  }

  blockquote:before {
    font-size: 3.5em;
    line-height: 0.1em;
    content: "“";
    vertical-align: -0.4em;
    opacity: 0.2;
  }
  blockquote:after {
    font-size: 3.5em;
    line-height: 0.1em;
    content: "”";
    vertical-align: -0.4em;
    opacity: 0.2;
  }
  blockquote p {
    display: inline;
  }
  blockquote:first-of-type {
    margin-top: 1.7em;
  }
  cite {
    margin-left: 30%;
  }

  cite::before {
    content: "\\2014";
  }

  table {
    border-spacing: 1em;
  }
  thead th {
    font-weight: 200;
  }
  a {
    text-decoration: none;
    color: #74578a;
    &:focus,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
      background-color: none;
    }
    &:hover {
      color: darkhaki;
      transition: 0.5s;
      cursor: pointer;
      background-color: black;
      border-radius: 20%;
    }

    &:not(:hover) {
      transition: 0.5s;
    }
  }
  ul li {
    margin: 0.08em 0 0 0;
  }
`
export const Post = ({ children }) => {
  return <PostWrapper>{children}</PostWrapper>
}
