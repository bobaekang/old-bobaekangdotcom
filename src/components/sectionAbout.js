import React from 'react'
import { Link } from 'gatsby'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import MyImage from './myImage'
import MySocial from './mySocial'
import colors from '../styles/colors'

const useStyles = makeStyles({
  sectionMain: {
    '& h2': {
      color: colors.red,
    },
    '& a': {
      color: colors.blue,
      textDecoration: 'underline',
      '&:hover': {
        color: colors.red,
      },
    },
  },
})

const SectionAbout = () => {
  const classes = useStyles()

  const aboutMain = (
    <div className={classes.sectionMain}>
      <h2>Hi, I'm Bobae</h2>
      <p>
        I started out as a researcher and data analyst, and later fell in love
        with modern web technologies as well as the art and craft of software
        development in general.
      </p>
      <p>
        If you'd like to know more about me, I invite you to start with{' '}
        <Link to="/blog/hello-world">this blog post</Link>. Also, feel free to
        reach out to me via{' '}
        <a
          href="https://github.com/bobaekang"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        ,{' '}
        <a
          href="https://www.linkedin.com/in/bobaekang"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>{' '}
        or <a href="mailto:hello@bobaekang.com">email</a>!
      </p>
    </div>
  )

  return (
    <Container
      style={{ marginTop: '4rem', marginBottom: '4rem' }}
      maxWidth="md"
    >
      <Grid container justify="space-between">
        <Grid item xs={12} md={6}>
          {aboutMain}
        </Grid>
        <Grid item xs={12} md={3} style={{ maxWidth: '240px' }}>
          <MyImage />
          <br />
          <MySocial
            namespace="about"
            styles={`
              .about-social-icon {
                font-size: 1.5rem;
                margin-left: .2rem;
                margin-right: .2rem;
                color: ${colors.blue};
              }

              .about-social-icon:hover {
                color: ${colors.red};
              }
            `}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SectionAbout
