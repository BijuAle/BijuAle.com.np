import React from "react"
import { graphql } from "gatsby"
import { Container, Content, Post, SEO } from "../components"
import { H1 } from "../components/Typography"
import Img from "gatsby-image"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 2rem;
  row-gap: 2rem;
`
const notFound = ({ data }) => {
  return (
    <Container>
      <SEO />
      <Content>
        <Post>
          <H1>Reaching Me</H1>
          <Wrapper>
            {data.allFile.edges.map(({ node }) => (
              <Img
                key={Math.random()}
                fixed={node.childImageSharp.fixed}
                draggable={false}
                alt={node.childImageSharp.fixed.originalName.split(".")[0]}
                title={node.childImageSharp.fixed.originalName.split(".")[0]}
              ></Img>
            ))}
          </Wrapper>
        </Post>
      </Content>
    </Container>
  )
}
export default notFound

export const data = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: {}, relativeDirectory: { eq: "contact" } }
      sort: { fields: relativePath, order: DESC }
    ) {
      edges {
        node {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
              originalName
            }
          }
        }
      }
    }
  }
`
