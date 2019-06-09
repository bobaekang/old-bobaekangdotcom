import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from "gatsby"

// material ui
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

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

const SectionBlog = ({ classes }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          limit: 2,
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
              }
              fields {
                slug
              }
              excerpt
            }
          }
        }
      }
    `
  )
  
  return (
    <Container maxWidth="lg">
      <h2 className={classes.sectionTitle}>Latest writings</h2>
      <Grid container spacing={3}>
        {
          data.allMarkdownRemark.edges.map(({ node }) => (
            <Grid item xs={12} sm={4} key={node.id}>
              <Paper className={classes.paper}>
                <Link to={node.fields.slug}>
                  <h3>{node.frontmatter.title}</h3>
                  <p>{node.frontmatter.date}</p>
                  <p>{node.excerpt}</p>
                </Link> 
              </Paper>
            </Grid>
          ))
        }
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Link to="/blog">
              <div className={classes.alignCenter}>
                  <h3>Read more...</h3>
              </div>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

SectionBlog.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SectionBlog)