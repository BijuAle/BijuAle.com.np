import styled from "styled-components"
import React from "react"

export const PostWrapper = styled.main`
  grid-column: 4/12;

  p {
    text-align: justify;
    text-justify: inter-character;
    font-size: 1em;
    margin-bottom: 1em;
  }
  p:nth-of-type(1) {
    margin-top: 1.5em;
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
    font-size: 1.3em;
  }
  h2 {
    font-size: 1.1em;
  }
  ul,
  ol {
    margin: 1rem 0 1rem 2rem;
  }
  li {
    margin: 0.2rem 0;
  }

  blockquote:before {
    font-size: 3.5em;
    content: "“";
    vertical-align: -0.4em;
    line-height: 0.1em;
    opacity: 0.2;
  }
  blockquote:after {
    font-size: 3.5em;
    content: "”";
    vertical-align: -0.4em;
    line-height: 0.1em;
    opacity: 0.2;
  }
  blockquote p {
    display: inline;
    margin: 1rem auto;
  }
  cite {
    content: "- ";
    margin-left: 30%;
  }
`
export const Post = ({ children }) => {
  return <PostWrapper>{children}</PostWrapper>
}
