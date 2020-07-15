import React from "react"

const EL = props => {
  if (
    props.href.includes("bijuale.com.np") ||
    props.href.includes("localhost:8000") ||
    props.href[0] === "/" ||
    props.href[0] === "localhost:8000"
  ) {
    return <a href={props.href}>{props.children}</a>
  }
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}

export const ExternalLink = {
  a: EL,
}
