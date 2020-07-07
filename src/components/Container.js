import React from "react"
import styled from "styled-components"
import { Nav, Footer } from "../components"
// import BackgroundImage from "gatsby-background-image"
// import { graphql, useStaticQuery } from "gatsby"

const ContainerWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 4.5rem)) 1fr;
  grid-template-rows: auto;
  color: ${props => props.theme.colors.lightText};
  align-items: flex-start;
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
  /* const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "cartographer.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `) */

  return (
    <ContainerWrapper>
      {/* <BackgroundImage
        className="bg"
        fluid={data.file.childImageSharp.fluid}
      ></BackgroundImage> */}
      <Nav />
      {children}
      <Footer />
    </ContainerWrapper>
  )
}
