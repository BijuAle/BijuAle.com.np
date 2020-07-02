import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Theme from "./src/themes/theme"
import { MDXProvider } from "@mdx-js/react"
import { Table } from "./src/components"

const GlobalStyles = createGlobalStyle`

*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}

body,html{
  color:${props => props.theme.colors.lightText};
  font-family:${props => props.theme.fonts.main};
  height:100%;
  background-color: ${props => props.theme.colors.darkBg};
}


.bg{
  width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
}

a:hover {
  color: purple;
  transition: 4s;
  cursor:pointer;
  }
`
const components = {
  table: Table,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      {element}
    </ThemeProvider>
  </MDXProvider>
)
