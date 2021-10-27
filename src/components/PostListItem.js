import React from "react"
import { Link } from "gatsby"

export const PostListItem = ({ date, author, title, excerpt, slug, tags }) => {
  return (
    <div>
      <Link to={slug}>{title}</Link>
      <span style={{ float: "right", opacity: "50%" }}>{date}</span>
    </div>
  )
}
