import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// material ui
import { withStyles } from '@material-ui/core/styles'

// styles
import colors from '../styles/colors'

const styles = {
  image: {
    '& img': {
      borderRadius: '50%',
      border: `3px solid ${colors.blue}`,
    },
  },
}

const MyImage = ({ classes }) => (
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

MyImage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MyImage)
