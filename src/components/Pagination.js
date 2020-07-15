import styled from "styled-components"
import React from "react"
import { P } from "../components"
import { StyledLink } from "./Typography"

const PaginationWrapper = styled.div`
  grid-column: 2 / span 12;
  display: flex;
  justify-content: center;
  font-weight: 200;
  align-items: flex-start;
  z-index: 10;
  margin-top: -1.5rem;
  border-bottom-left-radius: 2%;

  padding: 0.2em;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0)
  );

  a {
    margin-right: 0.7rem;
    margin-left: 0.7rem;
    border-radius: 100%;
  }
  a:nth-child(1) {
    color: ${props =>
      props.isFirst
        ? props.theme.colors.darkText
        : props.theme.colors.lightText};
    pointer-events: ${props => (props.isFirst ? "none" : "auto")};
    cursor: ${props => (props.isFirst ? "default" : "pointer")};
  }

  a:nth-child(3) {
    color: ${props =>
      props.isLast
        ? props.theme.colors.darkText
        : props.theme.colors.lightText};
    pointer-events: ${props => (props.isLast ? "none" : "auto")};
    cursor: ${props => (props.isLast ? "default" : "pointer")};
  }
`
const PaginationElement = styled(props => <StyledLink {...props} />)`
  a:hover {
    color: gold;
    transition: 3s;
  }
  font-weight: 500;
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
`
export const Pagination = ({
  currentPage,
  numPages,
  isFirst,
  isLast,
  prevPage,
  nextPage,
}) => {
  return (
    <PaginationWrapper isFirst={isFirst} isLast={isLast}>
      <PaginationElement title={`Go back to Page: ` + prevPage} to={prevPage}>
        &lt;
      </PaginationElement>
      <P fontFamily="Josefin Slab" fontSize=".84em">
        {currentPage} of {numPages}
      </P>
      <PaginationElement title={`Go to page: ` + nextPage} to={nextPage}>
        &gt;
      </PaginationElement>
    </PaginationWrapper>
  )
}
