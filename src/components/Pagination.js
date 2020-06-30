import styled from "styled-components"
import React from "react"
import { StyledLink } from "./Typography"

const PaginationWrapper = styled.div`
  grid-column: 2 / span 12;
  display: flex;
  justify-content: center;
  font-weight: 200;
  &:hover {
    color: red;
    transition: 3s;
  }

  a:nth-child(1) {
    margin-right: 1rem;
    color: ${props =>
      props.isFirst
        ? props.theme.colors.darkText
        : props.theme.colors.lightText};
    pointer-events: ${props => (props.isFirst ? "none" : "auto")};
    cursor: ${props => (props.isFirst ? "default" : "pointer")};
  }

  a:nth-child(2) {
    margin-left: 1rem;
    color: ${props =>
      props.isLast
        ? props.theme.colors.darkText
        : props.theme.colors.lightText};
    pointer-events: ${props => (props.isLast ? "none" : "auto")};
    cursor: ${props => (props.isLast ? "default" : "pointer")};
  }
`
const PaginationElement = styled(props => <StyledLink {...props} />)`
  font-weight: 200;
`
export const Pagination = ({ isFirst, isLast, prevPage, nextPage }) => {
  return (
    <PaginationWrapper isFirst={isFirst} isLast={isLast}>
      <PaginationElement title="Previous Page" to={prevPage}>
        &lt;
      </PaginationElement>
      <PaginationElement title="Next Page" to={nextPage}>
        &gt;
      </PaginationElement>
    </PaginationWrapper>
  )
}
