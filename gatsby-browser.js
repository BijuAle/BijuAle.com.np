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

iframe {
  border-radius: 12px;
  box-shadow: 4px 4px 14px #000;
} 

/* .bg{
 display:flex;
} */
a{
  padding-bottom: 1rem;
  background-position: 0% 100%;
  background-repeat: repeat-x;
}

a:hover {  
  color: purple;
  transition: 4s;
  cursor:pointer;
}

a:not( :hover ){
 transition: 4s;
}

.dropcap {
  color: red;
  float: left;
  font-size: 5rem;
  line-height: 3.5rem;
  margin: 0;
  padding: 0.5rem;
}

/* hide visually from eyes, but not aurally from screen readers */
.invisible {
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  top: auto;
  white-space: nowrap;
  width: 1px;
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
