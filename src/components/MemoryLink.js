import React from "react"
import { Location } from "@reach/router"
import { Link } from "gatsby"

export const MemoryLink = ({ children, state, ...rest }) => (
  <Location>
    {({ location }) => (
      <Link {...rest} state={{ prevUrl: location.pathname, ...state }}>
        {children}
      </Link>
    )}
  </Location>
)
