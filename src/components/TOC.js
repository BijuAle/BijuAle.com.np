import React from "react"
import styled from "styled-components"
import { StyledLink } from "./Typography"

const slug = require("github-slugger").slug

const Wrapper = styled.div`
  overflow: hidden;
  max-height: 70vh;
  max-width: 30vh;
  position: fixed;
  right: 10rem;
  text-align: left;
  box-shadow: inset 15px 0 15px -15px rgba(0, 0, 0, 0.5);

  ::-webkit-scrollbar-track {
    background-color: #1a202c;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #310a4e;
  }
  &:hover {
    overflow-y: scroll;
  }

  li {
    list-style-type: none;
    margin: 0;
  }
  @media (max-width: 1400px) {
    display: none;
    right: 5rem;
  }
`
export const TOC = ({ headings }) => (
  <Wrapper>
    <ul>
      {headings.map(heading => (
        <li
          style={{
            marginLeft: `0rem`,
          }}
          key={heading.value}
        >
          <StyledLink to={"#" + slug(heading.value)}>
            {heading.value}
          </StyledLink>
        </li>
      ))}
    </ul>
  </Wrapper>
)
