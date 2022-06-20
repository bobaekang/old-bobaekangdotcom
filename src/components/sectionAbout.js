import React from 'react'
import { Link } from 'gatsby'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import MyImage from './myImage'

const SectionAbout = () => {
  return (
    <Container className="my-16" maxWidth="md">
      <Grid container justify="space-between">
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid item xs={12} md={3} className="max-w-[240px]">
          <MyImage />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SectionAbout
