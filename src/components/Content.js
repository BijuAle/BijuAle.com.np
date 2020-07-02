import styled from "styled-components"
import React from "react"

export const ContentWrapper = styled.main`
  grid-column: 4/12;
  display: flex;
  flex-direction: column;
  grid-row: auto;
`
export const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>
}
