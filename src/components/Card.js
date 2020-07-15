import styled from "styled-components"
import React from "react"
import { H1, P, Date, StyledLink, Tags } from "./Typography"
import kebabCase from "lodash/kebabCase"

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
  margin-bottom: 2rem;
  height: 100%;
  font-family: "Goudy Bookletter 1911";

  &:nth-of-type(1) {
    margin-top: 3rem;
  }
  &:nth-of-type(4) {
    margin-bottom: 1rem;
  }
`
const PostMetaWrapper = styled.div`
  display: flex;
  margin-top: 0.2rem;
`

export const Card = ({ date, title, excerpt, slug, tags }) => {
  return (
    <CardWrapper>
      <H1 lineHeight="1.1em" fontSize="1.3rem">
        <StyledLink to={slug}>{title}</StyledLink>
      </H1>
      <PostMetaWrapper>
        <Date fontFamily="Josefin Slab" fontSize=".8em">
          {date}&nbsp;|&nbsp;
        </Date>
        <P
          color="#8a865f"
          fontFamily="Josefin Slab"
          margin="0 .8em 0 0"
          fontSize=".8em"
        >
          {tags.map(tag => (
            <span
              style={{
                margin: "0 .5em 0 0",
                borderRadius: "10%",
              }}
              key={tag}
              fontSize=".8em"
            >
              <Tags to={`/tags/${kebabCase(tag)}/`}>{tag}</Tags>
            </span>
          ))}
        </P>
      </PostMetaWrapper>
      <P margin=".4em 0 0 0" lineHeight="1.1em" fontSize="1.06em">
        {excerpt}
      </P>
    </CardWrapper>
  )
}
