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
  link: {
    fontWeight: 600,
    color: colors.blue,
    '&:hover': {
      color: colors.red
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
        <p>... and I build web applications!</p>
        <p>While I love all sorts of web technologies, my recent focus has been building front-end apps using modern component-based JavaScript frameworks like React and Vue.</p>
        <p>I'm also a big fan of Docker, which helped me a lot to explore beyond what shows up on my screen.</p>
        <p>If you'd like to know more about me, I invite you to start with <Link className={classes.link} to="/blog/hello-world">this blog post</Link>. Also, feel free to reach out to me via <a className={classes.link} href="https://github.com/bobaekang" target="_blank" rel="noopener noreferrer">GitHub</a>, <a className={classes.link} href="https://www.linkedin.com/in/bobaekang" target="_blank" rel="noopener noreferrer">LinkedIn</a> or <a className={classes.link} href="mailto:hello@bobaekang.com">email</a>!</p>
      </Grid>
    </Grid>
  </Container>
)}

export default withStyles(styles)(SectionAbout)