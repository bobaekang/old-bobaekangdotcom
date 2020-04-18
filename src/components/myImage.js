import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { makeStyles } from '@material-ui/core/styles'

import colors from '../styles/colors'

const useStyles = makeStyles({
  image: {
    '& img': {
      borderRadius: '50%',
      border: `3px solid ${colors.blue}`,
    },
  },
})

const MyImage = () => {
  const classes = useStyles()

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
          className={classes.image}
          fluid={data.placeholderImage.childImageSharp.fluid}
        />
      )}
    />
  )
}

export default MyImage
