import styled from "styled-components"
import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const TagListStyle = styled.div``

export const TagList = ({ data }) => {
  return (
    <ul style={{ marginTop: "3rem" }}>
      {"Tags: "}
      {data.allMdx.group.map(tag => (
        <li
          key={tag.fieldValue}
          style={{
            listStyle: "none",
            display: "inline",
            padding: "2px",
            marginRight: ".5rem",
          }}
        >
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  )
}
