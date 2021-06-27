import React from "react"
import { Location } from "@reach/router"
import { StyledLink } from "../components"

export const MemoryLink = ({ children, state, ...rest }) => (
  <Location>
    {({ location }) => (
      <StyledLink {...rest} state={{ prevUrl: location.pathname, ...state }}>
        {children}
      </StyledLink>
    )}
  </Location>
)
