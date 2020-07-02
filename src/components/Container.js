import React from "react"
import styled from "styled-components"
import { Nav, Footer } from "../components"
// import BackgroundImage from "gatsby-background-image"
// import { graphql, useStaticQuery } from "gatsby"

const ContainerWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 4.2rem)) 1fr;
  grid-template-rows: auto;
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
