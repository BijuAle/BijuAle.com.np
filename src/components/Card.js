import styled from "styled-components"
import React from "react"
import { H1, P, Date, StyledLink } from "./Typography"
// import { ReadMoreBtn } from "../components"

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  margin-left: 0.8rem;
  height: 100%;
  font-family: "Goudy Bookletter 1911";

  :nth-last-child() {
    margin: 0;
  }
`
const PostMetaWrapper = styled.div`
  display: flex;
`

export const Card = ({ date, title, excerpt, slug, tags }) => {
  return (
    <CardWrapper>
      <H1 lineHeight="1.1em" fontSize="1.3rem">
        <StyledLink to={slug}>{title}</StyledLink>
      </H1>
      <PostMetaWrapper>
        <Date fontFamily="Josefin Slab" fontSize=".8em">
          {date}
        </Date>
        <P
          color="#8a865f"
          fontFamily="Josefin Slab"
          margin="0 0 0 .8em"
          fontSize=".8em"
        >
          {tags.join(`, `)}
        </P>
      </PostMetaWrapper>
      <P margin=".4em 0 0 0" lineHeight="1.1em" fontSize="1.06em">
        {excerpt}
      </P>
    </CardWrapper>
  )
}
