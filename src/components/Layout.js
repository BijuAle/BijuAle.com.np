import React from "react"
import { Header, Footer } from "../components"
import styled from "styled-components"

const LayoutStyle = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;

  @media only screen and (max-width: 600px) {
    margin: 0 auto;
    width: 90vw;
  }

  @media only screen and (min-width: 768px) {
    margin: 0 auto;
    width: 50%;
  }

  body {
    font-family: "Cormorant Garamond";
  }
  p {
    text-align: justify;
    margin-bottom: 0.5rem;
  }

  hr {
    border-top: 0.5px solid grey;
    border-bottom: 0.5px solid lightgrey;
  }

  h1 {
    font-size: 1em;
  }
  h2 {
    font-size: 0.9em;
  }
  h1,
  h2,
  h3 {
    margin: 0.2rem 0 0.2rem 0;
  }
  ul {
    margin-left: 1rem;
    list-style-position: inside;
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

  pre {
    border: 1px solid grey;
    border-radius: 1%;
    padding: 0.2rem;
  }

  pre code {
    white-space: pre-wrap !important;
  }
`

export const Layout = ({ children }) => {
  return (
    <>
      <LayoutStyle>
        <Header />
        <main>{children}</main>
        <Footer />
      </LayoutStyle>
    </>
  )
}
