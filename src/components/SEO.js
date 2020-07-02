import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        url
        image
        author
      }
    }
  }
`
export const SEO = ({ description, keywords, title, image, url, author }) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaTitle = title || data.site.siteMetadata.title
        const metaAuthor = author || data.site.siteMetadata.author
        const metaUrl = url || data.site.siteMetadata.url
        // const metaImage = image || data.site.siteMetadata.image
        const metaKeywords = keywords || [
          "Biju Ale",
          "Biju Ale Website",
          "Biju Ale Blog",
          "Biju",
          "Biju Blog",
          "Biju Website",
          "Biju Ale Nepal",
          "Biju Gatsby",
        ]
        return (
          <Helmet
            title={title}
            meta={[
              {
                name: `title`,
                content: metaTitle,
              },
              {
                name: `author`,
                content: metaAuthor,
              },
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `url`,
                content: metaUrl,
              },
              {
                property: `og:title`,
                content: metaTitle,
              },
              {
                property: `og:author`,
                content: metaAuthor,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:url`,
                content: metaUrl,
              },
            ].concat(
              metaKeywords && metaKeywords.length > 0
                ? {
                    name: `keywords`,
                    cpmtemt: metaKeywords.join(`,`),
                  }
                : []
            )}
          />
        )
      }}
    />
  )
}
