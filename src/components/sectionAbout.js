import React from "react"
import { Link } from 'gatsby'

// material ui
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

// components
import MyImage from './myImage'
import MySocial from './mySocial'

// styles
import colors from '../styles/colors'

const styles = {
  sectionBody: {
    '& a': {
      color: colors.blue,
      textDecoration: 'underline',
      '&:hover': {
        color: colors.red
      }
    }
  },
  sectionTitle: {
    color: colors.red
  }
}

const SectionAbout = ({ classes }) => {
  return (
  <Container maxWidth="lg">
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
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

      <Grid item xs={12} sm={6}>
        <h2 className={classes.sectionTitle}>Hi, I'm Bobae</h2>
        <div className={classes.sectionBody}>
          <p>... and I am an ambitious self-taught software engineer!</p>
          <p>I started out as a researcher and data analyst, and later fell in love with modern web technologies as well as the art and craft of software development in general.</p>
          <p>I'm also a big fan of FOSS and its community, which continue to empower me to grow in skills and knowledge beyond my wildest dreams.</p>
          <p>If you'd like to know more about me, I invite you to start with <Link to="/blog/hello-world">this blog post</Link>. Also, feel free to reach out to me via <a href="https://github.com/bobaekang" target="_blank" rel="noopener noreferrer">GitHub</a>, <a href="https://www.linkedin.com/in/bobaekang" target="_blank" rel="noopener noreferrer">LinkedIn</a> or <a href="mailto:hello@bobaekang.com">email</a>!</p>
        </div>
      </Grid>
    </Grid>
  </Container>
)}

export default withStyles(styles)(SectionAbout)