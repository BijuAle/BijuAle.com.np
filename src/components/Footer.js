import React from "react"
import styled from "styled-components"
import background from "../images/background/cartographer.png"

const FooterWrapper = styled.footer`
  font-family: "Josefin Slab";
  font-size: 0.85em;
  background-color: inherit;
  display: flex;
  grid-column: 2 / span 12;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(${background});
`
const FitContentWrapper = styled.div`
  padding: 0.3rem 2.3rem 0.3rem 0;
  /* box-shadow: inset 0 15px 15px -15px rgba(0, 0, 0, 0.5); */
  display: flex;
`
const RightsWrapper = styled.div`
  &:hover {
    color: gold;
    cursor: pointer;
  }
  &:hover:after {
    opacity: 1;
    transition-delay: 0.2s;
  }
  &:after {
    white-space: pre;
    opacity: 0;
    transition: 2s all;
    content: " (On all the content, media, source code, & design.)";
  }
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <FitContentWrapper>
        Biju Ale © 2017 {new Date().getFullYear()}
        <RightsWrapper>&nbsp;-&nbsp;All Rights Reserved</RightsWrapper>
      </FitContentWrapper>
    </FooterWrapper>
  )
}
