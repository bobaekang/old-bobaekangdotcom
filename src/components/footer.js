import React from 'react'
import { GitHub, Linkedin, Mail, Twitter } from 'react-feather'

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
          <GitHub className="inline" size="1.2rem" />
        </a>
        <a
          className="mx-1 hover:text-red"
          href="https://twitter.com/bobaekang"
          aria-label="See my Twitter profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="inline" size="1.2rem" />
        </a>
        <a
          className="mx-1 hover:text-red"
          href="https://www.linkedin.com/in/bobaekang"
          aria-label="See my LinkeIn profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="inline" size="1.2rem" />
        </a>
        <a
          className="mx-1 hover:text-red"
          href="mailto:hello@bobaekang.com"
          aria-label="Send me an email"
        >
          <Mail className="inline" size="1.2rem" />
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
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Tailwind CSS
        </a>
      </div>
    </footer>
  )
}

export default Footer
