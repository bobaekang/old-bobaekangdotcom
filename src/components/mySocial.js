import React from "react"
import { loadCSS } from 'fg-loadcss'

// material ui
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import EmailIcon from '@material-ui/icons/Email'

const styles = {
  socialList: {
    textAlign: 'center',
  }
}

const MySocial = ({ classes, namespace, styles }) => {
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);
  
  return (
    <div className={classes.socialList}>
      <style>{styles}</style>
      
      <a
        className={`${namespace}-social-icon`}
        href="https://github.com/bobaekang"
        aria-label="See my Github profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className='fab fa-github' style={{fontSize: 'inherit'}} />
      </a>
      <a
        className={`${namespace}-social-icon`}
        href="https://www.linkedin.com/in/bobaekang"
        aria-label="See my LinkeIn profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className='fab fa-linkedin' style={{fontSize: 'inherit'}} />
      </a>
      <a
        className={`${namespace}-social-icon`}
        href="mailto:hello@bobaekang.com"
        aria-label="Send me an email"
      >
        <EmailIcon style={{fontSize: 'inherit'}} />
      </a>
    </div>
  )
}

export default withStyles(styles)(MySocial)