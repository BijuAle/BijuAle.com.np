import React from "react"
import styled from "styled-components"
import { Header, Footer } from "."
import background from "../../images/background/green_cup.png"
import { SEO } from "../"

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 4.5rem)) 1fr;
  grid-template-rows: 6.5rem repeat(4, auto);
  color: ${props => props.theme.colors.lightText};
  background: url(${background}) fixed;

  //Scrollbar
  *::-webkit-scrollbar {
    width: 5px;
    height: 4px;
  }
  *::-webkit-scrollbar-track {
    background-color: gray;
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: darkslateblue;
    border-radius: 10px;
  }

  *::-moz-selection {
    background: lightpink;
  }
  *::selection {
    background: lightpink;
  }
`
export const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <SEO />
      <Header />
      {children}
      <Footer />
    </LayoutWrapper>
  )
}
