import styled from "styled-components"
import React from "react"
import { Meta, H1, StyledLink } from "./Typography"
import { ReadMoreBtn } from "../components"

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`
export const Card = ({ date, title, excerpt, slug }) => {
  return (
    <CardWrapper>
      <H1>
        <StyledLink size="inherit">{title}</StyledLink>
      </H1>
      <Meta size="xSmall">{date}</Meta>
      {excerpt} <ReadMoreBtn href={slug}>Read More</ReadMoreBtn>
    </CardWrapper>
  )
}
