import React from 'react'
import { Link } from 'gatsby'
import MyImage from './myImage'

const SectionAbout = () => {
  return (
    <div className="my-16">
      <div className="sm:flex sm:justify-between">
        <div className="sm:basis-1/2">
          <h2 className="text-red">Hi, I'm Bobae</h2>
          <p>
            I started out as a researcher and data analyst, and later fell in
            love with modern web technologies as well as the art and craft of
            software development in general.
          </p>
          <p>
            If you'd like to know more about me, I invite you to start with{' '}
            <Link
              className="text-blue hover:text-red underline"
              to="/blog/hello-world"
            >
              this blog post
            </Link>
            . Also, feel free to reach out to me via{' '}
            <a
              className="text-blue hover:text-red underline"
              href="https://github.com/bobaekang"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            ,{' '}
            <a
              className="text-blue hover:text-red underline"
              href="https://twitter.com/bobaekang"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            ,{' '}
            <a
              className="text-blue hover:text-red underline"
              href="https://www.linkedin.com/in/bobaekang"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{' '}
            or{' '}
            <a
              className="text-blue hover:text-red underline"
              href="mailto:hello@bobaekang.com"
            >
              email
            </a>
            !
          </p>
        </div>
        <div className="sm:basis-1/2 max-w-[240px]">
          <MyImage />
        </div>
      </div>
    </div>
  )
}

export default SectionAbout
