import React from 'react'
import PropTypes from 'prop-types'
import { loadCSS } from 'fg-loadcss'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import EmailIcon from '@material-ui/icons/Email'

const useStyles = makeStyles({
  socialList: {
    textAlign: 'center',
  },
})

const MySocial = ({ namespace, styles }) => {
  const classes = useStyles()

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css')
    )
  }, [])

  const socialIconClass = `${namespace}-social-icon`
  const socialGithub = (
    <a
      className={socialIconClass}
      href="https://github.com/bobaekang"
      aria-label="See my Github profile"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="fab fa-github" style={{ fontSize: 'inherit' }} />
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
      <Icon className="fab fa-linkedin" style={{ fontSize: 'inherit' }} />
    </a>
  )
  const socialEmail = (
    <a
      className={socialIconClass}
      href="mailto:hello@bobaekang.com"
      aria-label="Send me an email"
    >
      <EmailIcon style={{ fontSize: 'inherit' }} />
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
