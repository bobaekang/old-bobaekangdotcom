import React from "react"

// material ui
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'

// components
import MySocial from './mySocial'

// style
import colors from '../styles/colors'

const styles = {
  footer: {
    lineHeight: 'normal',
    paddingTop: ".5rem",
    paddingBottom: ".1rem",
    fontSize: "0.8rem",
    textAlign: 'center',
    color: colors.darkgrey,
    backgroundColor: '#f9f9f9',
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
    <Container maxWidth="lg">
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
    </Container>
  </footer>
)

export default withStyles(styles)(Footer)
