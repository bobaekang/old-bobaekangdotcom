import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import EmailIcon from '@material-ui/icons/Email'

const useStyles = makeStyles({
  socialList: {
    textAlign: 'center',
  },
})

const MySocial = ({ namespace, styles }) => {
  const classes = useStyles()

  const socialIconClass = `${namespace}-social-icon`
  const socialGithub = (
    <a
      className={socialIconClass}
      href="https://github.com/bobaekang"
      aria-label="See my Github profile"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHubIcon />
    </a>
  )
  const socialLinkedin = (
    <a
      className={socialIconClass}
      href="https://www.linkedin.com/in/bobaekang"
      aria-label="See my LinkeIn profile"
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkedInIcon />
    </a>
  )
  const socialEmail = (
    <a
      className={socialIconClass}
      href="mailto:hello@bobaekang.com"
      aria-label="Send me an email"
    >
      <EmailIcon />
    </a>
  )

  return (
    <div className={classes.socialList}>
      <style>{styles}</style>
      {socialGithub}
      {socialLinkedin}
      {socialEmail}
    </div>
  )
}

MySocial.propTypes = {
  namespace: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
}

export default MySocial
