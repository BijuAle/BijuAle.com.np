import React from "react"
import { graphql } from "gatsby"
import { Container, Content, SEO } from "../components"
import { H1, P } from "../components/Typography"
import Img from "gatsby-image"

const notFound = ({ data }) => {
  const image404 = data.imageSharp.fluid
  return (
    <Container>
      <SEO />
      <Content>
        <H1>
          Sorry. Could not find what you're looking for in the entire Middle
          Earth.
        </H1>
        <P font-size="xSmall" fontFamily="josefinSlab" marginTop="2rem">
          As Tolkien said, not all those who wander are lost. But you seem to
          have lost your way. The page you are looking for may have been moved
          or deleted or may not have existed at the first place. They call it a
          "404 Not Found".
        </P>
        <Img
          fluid={image404}
          draggable={false}
          alt="Map of Middle Earth."
          title="asds"
        ></Img>

        {/* \Image Credit: Terra di Mezzo. by Gecko Art, Italy (pinterest.com/pin/590323463636983034)*/}
      </Content>
    </Container>
  )
}

export default notFound
export const notFoundQuery = graphql`
  query NotFoundQuery {
    imageSharp(fluid: { originalName: { eq: "middle-earth.png" } }) {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
