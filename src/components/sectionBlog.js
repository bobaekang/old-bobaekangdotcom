import React from "react"
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from "gatsby"

// material ui
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

// style
import colors from '../styles/colors'

const styles = {
  alignCenter: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    height: '100%'
  },
  paper: {
    padding: '1em',
    height: '250px',
    boxShadow: `
      0px 1px 6px 0px ${colors.blue},
      0px 1px 2px 0px ${colors.blue},
      0px 2px 2px -1px ${colors.blue}
    `,
    '& p': {
      marginBottom: '0'
    },
    '&:hover': {
      boxShadow: `
        0px 1px 6px 0px ${colors.red},
        0px 1px 2px 0px ${colors.red},
        0px 2px 2px -1px ${colors.red}
      `,
      '& h3': {
        color: colors.red
      }
    }
  },
  sectionTitle: {
    color: colors.red,
    marginBottom: '1em'
  }
}

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
              excerpt(pruneLength: 120)
            }
          }
        }
      }
    `
  )
  
  return (
    <Container style={{ marginTop: '4rem', marginBottom: '4rem' }} maxWidth="lg">
      <h2 className={classes.sectionTitle}>Latest writings</h2>
      <Grid container spacing={3}>
        {
          data.allMarkdownRemark.edges.map(({ node }) => (
            <Grid item xs={12} sm={8} md={6} lg={4} key={node.id}>
              <Paper className={classes.paper}>
                <Link to={node.fields.slug}>
                  <div className={classes.alignCenter}>
                    <div class="date">{node.frontmatter.date}</div>
                    <h3>{node.frontmatter.title}</h3>
                    <p>{node.excerpt}</p>
                  </div>
                </Link> 
              </Paper>
            </Grid>
          ))
        }
        <Grid item xs={12} sm={8} md={6} lg={4}>
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