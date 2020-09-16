import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const AboutImage = () => {
  const data = useStaticQuery(graphql`
    query {
      imageSharp(fixed: { originalName: { eq: "biju.png" } }) {
        fixed(quality: 100, width: 280) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  `)
  return (
    <figure style={{ display: "table", float: "right" }}>
      <Img
        fixed={data.imageSharp.fixed}
        draggable={false}
        alt="Biju and Friends"
        title="Biju and Friends"
        style={{
          display: "inline-block",
          float: "right",
          margin: "0 0 0 .3em",
          borderRadiuds: "40%",
        }}
      ></Img>
      <figcaption
        style={{
          display: "table-caption",
          captionSide: "bottom",
          lineHeight: "1em",
          margin: ".2em 0 0 1em",
          fontSize: ".75em",
          color: "#4c4963",
        }}
      >
        Me (far-left), & Kristian (far-right) with our host-family's children in
        our bucolic crib (Guinea Pig House) Panchaling Hill, Dhading, Nepal
        (2018.04.27, 19:39:08)
      </figcaption>
    </figure>
  )
}
export default AboutImage
