import styled from "styled-components"
import React from "react"
import { H1, Date, StyledLink } from "./Typography"
// import { ReadMoreBtn } from "../components"

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`
export const Card = ({ date, title, excerpt, slug }) => {
  return (
    <CardWrapper>
      <H1>
        <StyledLink to={slug} size="inherit">
          {title}
        </StyledLink>
      </H1>
      <Date size="date">{date}</Date>
      {excerpt}
    </CardWrapper>
  )
}
