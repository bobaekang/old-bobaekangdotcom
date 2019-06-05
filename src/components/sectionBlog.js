import React from "react"
import PropTypes from 'prop-types'

// material ui
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

// style
import colors from '../styles/colors'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  alignCenter: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    alignContent: 'center',
    height: '100%'
  },
  paper: {
    padding: theme.spacing(3),
    height: '250px',
    '&:hover': {
      backgroundColor: colors.blue
    }
  },
  sectionTitle: {
    color: colors.red,
    marginBottom: '1em'
  }
});

const SectionBlog = ({ classes }) => (
  <Container maxWidth="lg">
    <h2 className={classes.sectionTitle}>Latest writings</h2>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <h3>Title A</h3>
          <p>June 15, 2019</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, aperiam!</p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <h3>Title B</h3>
          <p>June 15, 2019</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, culpa!</p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <div className={classes.alignCenter}>
              <h3>Read more...</h3>
          </div>
        </Paper>
      </Grid>
    </Grid>
  </Container>
)

SectionBlog.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SectionBlog)