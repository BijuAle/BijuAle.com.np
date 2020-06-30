import styled from "styled-components"
import React from "react"

export const ContentWrapper = styled.main`
  grid-column: 4/12;
`
export const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>
}
