import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Theme from "./src/themes/theme"

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
`
export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
    {element}
  </ThemeProvider>
)
