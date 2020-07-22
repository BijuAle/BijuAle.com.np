import React from "react"
import { graphql } from "gatsby"
import { Container, Content, Post, SEO } from "../components"
import { PostTitle, P } from "../components/Typography"
import Img from "gatsby-image"

const notFound = ({ data }) => {
  return (
    <Container>
      <SEO />
      <Content>
        <Post>
          <PostTitle lineHeight="1.1em" fontSize="1.3rem">
            Sorry. Could not find that resource in the entire Middle Earth.
          </PostTitle>
          <P margin="1em 0 1em 0" lineHeight="1.1em" fontSize="1.06em">
            As Tolkien said, not all those who wander are lost. But you seem to
            have lost your way. The page you are looking for may have been moved
            or deleted or may not exist at all. This case is also called a "404
            Not Found".
          </P>
          <Img
            fluid={data.imageSharp.fluid}
            draggable={false}
            alt="Map of Middle Earth."
            title="Map of Middle Earth."
          ></Img>
        </Post>
        {/* \Image Credit: Terra di Mezzo. by Gecko Art, Italy (pinterest.com/pin/590323463636983034)*/}
      </Content>
    </Container>
  )
}
export default notFound

export const notFoundQuery = graphql`
  query {
    imageSharp(fluid: { originalName: { eq: "middle-earth.png" } }) {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
