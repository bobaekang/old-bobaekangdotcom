import React from "react"
import { loadCSS } from 'fg-loadcss';
import clsx from 'clsx'

// material ui
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import EmailIcon from '@material-ui/icons/Email'

// components
import Image from './image.js'

// styles
import colors from '../styles/colors'

const styles = theme => ({
  sectionTitle: {
    color: colors.red
  },
  socialList: {
    textAlign: 'center'
  },
  social: {
    margin: '20px 5px'
  }
})

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
        <Image />
        <div className={classes.socialList}>
          <Icon className={clsx(classes.social, 'fab fa-github')} />
          <Icon className={clsx(classes.social, 'fab fa-linkedin')} />
          <EmailIcon className={classes.social}/>
        </div>
      </Grid>

      <Grid item xs={12} sm={6}>
        <h2 className={classes.sectionTitle}>Hello World</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum officiis itaque doloribus placeat optio nihil ab nostrum maxime odio fugiat.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorum, dolor voluptatem voluptatibus, repellat consequatur dignissimos quaerat laudantium deserunt magni mollitia voluptas adipisci ad sapiente officiis alias porro pariatur nemo?</p>
      </Grid>
    </Grid>
  </Container>
)}

export default withStyles(styles)(SectionAbout)