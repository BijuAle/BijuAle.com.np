import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const BookImage = () => {
  const data = useStaticQuery(graphql`
    query CloudinaryImage {
      cloudinaryMedia(public_id: { eq: "blog/opening_a_new_book" }) {
        secure_url
      }
    }
  `)
  return (
    <div>
      <img src={data.cloudinaryMedia.secure_url} alt={"f"} />
    </div>
  )
}

export default BookImage
