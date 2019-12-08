import React from "react"

// material ui
import { withStyles } from '@material-ui/core/styles'

// components
import MySocial from './mySocial'

// style
import colors from '../styles/colors'

const styles = {
  footer: {
    backgroundColor: '#f9f9f9',
    color: colors.darkgrey,
    fontSize: "0.8rem",
    paddingBottom: "0.1rem",
    paddingTop: ".5rem",
    textAlign: 'center',
    '& a': {
      '&:hover': {
        color: colors.red,
        fontWeight: 'bold'
      }
    }
  }
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
      { `, ` }
      <a href="https://material-ui.com/">Material UI</a>
      { ` & ` }
      <a href="https://alvarotrigo.com/fullPage/">FullPage.js</a>
    </div>
  </footer>
)

export default withStyles(styles)(Footer)
