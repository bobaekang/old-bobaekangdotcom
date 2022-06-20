import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const MyImage = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          placeholderImage: file(relativePath: { eq: "my-image.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => (
        <Img
          className="[&>img]:rounded-full [&>picture>img]:rounded-full"
          fluid={data.placeholderImage.childImageSharp.fluid}
        />
      )}
    />
  )
}

export default MyImage
