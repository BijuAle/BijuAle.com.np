import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const notFound = ({ data }) => {
  const image = getImage(data.file)
  return (
    <Layout>
      <p>Sorry. Could not find that resource in the entire Middle Earth.</p>

      <p margin="1em 0 1em 0" lineHeight="1.1em" fontSize="1.06em">
        As Tolkien said, not all those who wander are lost. But you seem to have
        lost your way. The page you are looking for may have been moved or
        deleted or may not exist at all. This case is also called a "404 Not
        Found".
      </p>
      <GatsbyImage
        image={image}
        draggable={false}
        alt="Map of Middle Earth."
        title="Map of Middle Earth."
      />

      {/* \Image Credit: Terra di Mezzo. by Gecko Art, Italy (pinterest.com/pin/590323463636983034)*/}
    </Layout>
  )
}
export default notFound

export const notFoundQuery = graphql`
  query {
    imageSharp(fluid: { originalName: { eq: "middle-earth.png" } }) {
      gatsbyImageData
    }
  }
`
