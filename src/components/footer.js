import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import EmailIcon from '@material-ui/icons/Email'
import TwitterIcon from '@material-ui/icons/Twitter'

const Footer = () => {
  return (
    <footer className="text-darkgrey text-[0.8rem] pb-[0.8rem] text-center">
      <div>
        <a
          className="mx-1 hover:text-red"
          href="https://github.com/bobaekang"
          aria-label="See my Github profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon fontSize="small" />
        </a>
        <a
          className="mx-1 hover:text-red"
          href="https://twitter.com/bobaekang"
          aria-label="See my Twitter profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon fontSize="small" />
        </a>
        <a
          className="mx-1 hover:text-red"
          href="https://www.linkedin.com/in/bobaekang"
          aria-label="See my LinkeIn profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon fontSize="small" />
        </a>
        <a
          className="mx-1 hover:text-red"
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
          className="underline hover:text-red"
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          Gatsby
        </a>
        {` & `}
        <a
          className="underline hover:text-red"
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
