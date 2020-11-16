import styled from "styled-components"
import React from "react"

const PostWrapper = styled.main`
  grid-column: 4/12;
  margin-top: 2rem;
  margin-bottom: 4rem;
  margin-left: 1rem;
  font-family: "Goudy Bookletter 1911";
  font-weight: 100;
  text-align: justify;
  text-justify: auto;

  ul,
  ol {
    margin: 0 0 0 2rem;
    list-style-type: none;
    opacity: 0.85;
    list-style: disc outside url("/bullet.png");
  }
  p {
    margin: 0 0 1em 0;
    font-size: 1.067em;
    line-height: 1.09em;
    opacity: 0.85;
  }

  p:nth-of-type(1)::first-letter {
    font-family: "Josefin Slab";
    font-size: 400%;
    font-style: italic;
    color: #363661;
    text-shadow: -1px -1px 0 darkslategray, 1px -1px 0 black, -1px 1px 0 black,
      1px 1px 0 black;
    initial-letter: 2;
    line-height: 1;
    float: left;
    padding: 0 0.23em 0 0;
    margin-bottom: 0;
  }
  *::-moz-selection {
    background: lightpink;
  }
  *::selection {
    background: lightpink;
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
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: #465440;
  }
  h1 {
    font-family: "Goudy Bookletter 1911";
    font-size: 1.35em;
    font-weight: 200;
    line-height: 1.1;
    color: #465440;
  }
  h2 > p {
    margin-top: 0;
  }

  h2 {
    font-size: 1.3em;
    font-weight: 100;
    margin-bottom: 0;
    color: #8c6258;
  }

  h3 {
    font-size: 1.25em;
    font-weight: 100;
  }

  blockquote {
    font-size: 1.1em;
    line-height: 1.15em;
    margin-left: 2rem;
    color: #501e56;
    opacity: 0.93;
  }

  blockquote:before {
    font-size: 3.5em;
    line-height: 0.1em;
    content: "\\201C";
    vertical-align: -0.4em;
    opacity: 0.2;
  }
  blockquote:after {
    font-size: 3.5em;
    line-height: 0.1em;
    content: "\\201D";
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
    margin-left: 50%;
    margin-bottom: 1.5rem;
    display: inline-block;
    opacity: 0.6;
  }

  cite::before {
    content: "\\2014";
  }

  table {
    border-spacing: 1em;
    opacity: 0.74;
  }
  thead th {
    font-weight: 200;
  }
  a {
    text-decoration: none;
    color: #363661;
    &:focus,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
      background-color: none;
    }
    &:hover {
      color: purple;
      transition: 0.5s;
      cursor: pointer;
      border-radius: 20%;
    }

    &:not(:hover) {
      transition: 0.5s;
    }
  }

  deckgo-highlight-code {
    margin-bottom: 1.5rem;
    --deckgo-highlight-code-padding: 0 5px;
    --deckgo-highlight-code-font-size: 0.95em;
    --deckgo-highlight-code-token-selector: green;
    --deckgo-highlight-code-token-operator: darkkhaki;
    --deckgo-highlight-code-carbon-header-padding: 2px;
    --deckgo-highlight-code-carbon-header-button-width: 3px;
    --deckgo-highlight-code-carbon-header-button-height: 3px;
    --deckgo-highlight-code-carbon-header-button-red-background: maroon;
    --deckgo-highlight-code-carbon-header-button-red-border: 0.5px solid maroon;
    --deckgo-highlight-code-carbon-header-button-yellow-background: purple;
    --deckgo-highlight-code-carbon-header-button-yellow-border: 0.5px solid
      purple;
    --deckgo-highlight-code-carbon-header-button-green-background: slategray;
    --deckgo-highlight-code-carbon-header-button-green-border: 0.5px solid
      slategray;
    --deckgo-highlight-code-token-property: gray;
  }
  .katex {
    font-size: 0.97em;
  }

  summary {
    display: inline;
  }
  summary:focus {
    outline: 0;
  }
  summary:hover {
    transition: 0.5s;
    cursor: pointer;
    border-radius: 20%;
    color: darkslateblue;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .details-animated[open] {
    animation-name: fadeIn;
    animation-duration: 0.7s;
  }

  hr {
    border: 0;
    height: 1px;
    background: black;
    margin-bottom: 1rem;
  }
`

export const Post = ({ children }) => {
  return <PostWrapper>{children}</PostWrapper>
}
