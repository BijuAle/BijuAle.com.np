import styled from "styled-components"
import React from "react"
import { Link } from "gatsby"

const PaginationStyle = styled.div`
  opacity: 80%;
  text-align: center;
  margin-top: 0.5rem;
  a:nth-child(1) {
    color: ${props => (props.isFirst ? "grey" : "blue")};
    pointer-events: ${props => (props.isFirst ? "none" : "auto")};
    cursor: ${props => (props.isFirst ? "default" : "pointer")};
  }

  a:nth-child(3) {
    color: ${props => (props.isFirst ? "blue" : "grey")};
    pointer-events: ${props => (props.isLast ? "none" : "auto")};
    cursor: ${props => (props.isLast ? "default" : "pointer")};
  }
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
    <PaginationStyle isFirst={isFirst} isLast={isLast}>
      <Link title={`Go back to Page: ` + prevPage} to={prevPage}>
        ← &nbsp;
      </Link>
      <span>
        {currentPage} of {numPages}
      </span>
      <Link title={`Go to page: ` + nextPage} to={nextPage}>
        &nbsp; →
      </Link>
    </PaginationStyle>
  )
}
