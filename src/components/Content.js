import styled from "styled-components"
import React from "react"

const ContentWrapper = styled.main`
  grid-column: 4/12;
  display: flex;
  flex-direction: column;
  box-shadow: inset 15px 0px 15px -15px rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 2%;
`
export const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>
}
