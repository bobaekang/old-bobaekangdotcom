import React from "react"

// material ui
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

// components
import Image from './image.js'

// styles
import colors from '../styles/colors'

const styles = theme => ({
  sectionTitle: {
    color: colors.red
  }
})

const SectionAbout = ({ classes }) => (
  <Container maxWidth="lg">
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <Image />
      </Grid>
      <Grid item xs={12} sm={6}>
        <h2 className={classes.sectionTitle}>Hello World</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum officiis itaque doloribus placeat optio nihil ab nostrum maxime odio fugiat.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorum, dolor voluptatem voluptatibus, repellat consequatur dignissimos quaerat laudantium deserunt magni mollitia voluptas adipisci ad sapiente officiis alias porro pariatur nemo?</p>
      </Grid>
    </Grid>
  </Container>
)

export default withStyles(styles)(SectionAbout)