import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import MySocial from './mySocial'
import colors from '../styles/colors'

const styles = {
  footer: {
    color: colors.darkgrey,
    fontSize: '0.8rem',
    paddingBottom: '0.8rem',
    textAlign: 'center',
    '& a': {
      textDecoration: 'underline',
      '&:hover': {
        color: colors.red,
      },
    },
  },
}

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <MySocial
      namespace="footer"
      styles={`
        .footer-social-icon {
          font-size: 1rem;
          margin-left: .2rem;
          margin-right: .2rem;
        }
      `}
    />
    <div>
      © Bobae Kang {new Date().getFullYear()}, Powered by
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
      {` & `}
      <a href="https://material-ui.com/">Material UI</a>
    </div>
  </footer>
)

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Footer)
