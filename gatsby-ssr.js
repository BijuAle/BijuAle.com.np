import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Theme from "./src/themes/theme"
import { MDXProvider } from "@mdx-js/react"
import { Table, MemoryLink } from "./src/components"
import props from "prop-types"

const GlobalStyles = createGlobalStyle`
body{
  min-height: 100vh;
  /* background-color: ${props => props.theme.colors.darkBg}; */
  color:gray;
}
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
html{
  /* scroll-behavior: smooth; */
  scroll-padding-top: 8em;
}

//Scrollbar

*::-webkit-scrollbar {
    width: 9px;
  }
  *::-webkit-scrollbar-track {
    background-color: #1A202C;
  }
  *::-webkit-scrollbar-thumb {
  background-color: #310a4e;
  border-radius: 10px;
  border: .5px solid darkslategray;
}

iframe {
  border-radius: 12px;
  box-shadow: 4px 4px 14px #000;
} 

nav li a:hover {  
  color: yellow;
  transition: 1s;
  cursor:pointer;
}
`

const EL = props => {
  if (
    props.href.includes("bijuale.com.np") ||
    props.href.includes("localhost:8000") ||
    props.href[0] === "/" ||
    props.href[0] === "localhost:8000"
  ) {
    return <a href={props.href}>{props.children}</a>
  }
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}
const components = {
  table: Table,
  a: EL,
  Link: <MemoryLink {...props}></MemoryLink>,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      {element}
    </ThemeProvider>
  </MDXProvider>
)
