import styled from "styled-components"
import React from "react"
import { StyledLink } from "./Typography"

const ButtonWrapper = styled(props => (
  <StyledLink fontSize="small" {...props} />
))``

export const ReadMoreBtn = ({ children, href }) => {
  return <ButtonWrapper to={href}>{children}</ButtonWrapper>
}
