import styled from "styled-components"
import React from "react"

export const PostWrapper = styled.main`
  grid-column: 4/12;
`
export const Post = ({ children }) => {
  return <PostWrapper>{children}</PostWrapper>
}
