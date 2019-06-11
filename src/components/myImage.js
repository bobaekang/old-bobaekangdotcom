import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from 'prop-types'

// material ui
import { withStyles } from '@material-ui/core/styles'

const styles = {
  image: {
    '& img': {
      borderRadius: '50%'
    }
  }
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
    render={data => <Img
      className={classes.image}
      fluid={data.placeholderImage.childImageSharp.fluid}
    />}
  />
)

MyImage.propTypes = {
  children: PropTypes.node.isRequired
}

export default withStyles(styles)(MyImage)