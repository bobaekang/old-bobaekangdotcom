import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import MySocial from './mySocial'
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
})

const Footer = () => {
  const classes = useStyles()

  return (
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
