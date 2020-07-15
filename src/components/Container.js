import React from "react"
import styled from "styled-components"
import { Nav, Footer } from "../components"

const ContainerWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 4.5rem)) 1fr;
  grid-template-rows: 6.5rem repeat(4, auto);
  color: ${props => props.theme.colors.lightText};
  background-color: ${props => props.theme.colors.darkBg};

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
`
export const Container = ({ children }) => {
  return (
    <ContainerWrapper>
      <Nav />
      {children}
      <Footer />
    </ContainerWrapper>
  )
}
