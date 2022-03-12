import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import EmailIcon from '@material-ui/icons/Email'
import TwitterIcon from '@material-ui/icons/Twitter'

import colors from '../styles/colors'

const useStyles = makeStyles({
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
  social: {
    margin: '0 .2rem',
  },
})

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <div>
        <a
          className={classes.social}
          href="https://github.com/bobaekang"
          aria-label="See my Github profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon fontSize="small" />
        </a>
        <a
          className={classes.social}
          href="https://twitter.com/bobaekang"
          aria-label="See my Twitter profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon fontSize="small" />
        </a>
        <a
          className={classes.social}
          href="https://www.linkedin.com/in/bobaekang"
          aria-label="See my LinkeIn profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon fontSize="small" />
        </a>
        <a
          className={classes.social}
          href="mailto:hello@bobaekang.com"
          aria-label="Send me an email"
        >
          <EmailIcon fontSize="small" />
        </a>
      </div>
      <div>
        © Bobae Kang {new Date().getFullYear()}, Powered by
        {` `}
        <a
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          Gatsby
        </a>
        {` & `}
        <a
          href="https://material-ui.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Material UI
        </a>
      </div>
    </footer>
  )
}

export default Footer
