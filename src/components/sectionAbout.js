import React from "react"
import { Link } from 'gatsby'
import clsx from 'clsx'
import { loadCSS } from 'fg-loadcss'
import PropTypes from 'prop-types'

// material ui
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import EmailIcon from '@material-ui/icons/Email'

// components
import MyImage from './myImage'

// styles
import colors from '../styles/colors'

const styles = {
  link: {
    fontWeight: 400,
    color: colors.blue,
    '&:hover': {
      color: colors.red
    }
  },
  sectionTitle: {
    color: colors.red
  },
  socialList: {
    textAlign: 'center'
  },
  socialIcon: {
    margin: '20px 5px'
  }
}

const SectionAbout = ({ classes }) => {
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
  <Container maxWidth="lg">
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3} md={2}>
        <MyImage />
        <div className={classes.socialList}>
          <a
            href="https://github.com/bobaekang"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              className={
                clsx(classes.link, classes.socialIcon, 'fab fa-github')
              }
            />
          </a>
          <a
            href="https://www.linkedin.com/in/bobaekang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              className={
                clsx(classes.socialIcon, classes.link, 'fab fa-linkedin')
              }
            />
          </a>
          <a href="mailto:hello@bobaekang.com">
            <EmailIcon className={clsx(classes.link, classes.socialIcon)}/>
          </a>
        </div>
      </Grid>

      <Grid item xs={12} sm={6}>
        <h2 className={classes.sectionTitle}>Hi, I'm Bobae</h2>
        <p>I build web applications in support of the administration of and research on criminal justice in Illinois.</p>
        <p>Though I love all sorts of web technologies, my focus has been building front-end apps using modern component-based JavaScript frameworks like React and Vue.</p>
        <p>If you'd like to know more about me, I invite you to start with <Link className={classes.link} to="/blog/hello-world">this blog post</Link>. Also, feel free to reach out to me via GitHub, LinkedIn or email!</p>
      </Grid>
    </Grid>
  </Container>
)}

SectionAbout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(SectionAbout)