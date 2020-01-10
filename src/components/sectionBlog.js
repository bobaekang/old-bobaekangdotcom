import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'

// material ui
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

// style
import colors from '../styles/colors'

const defineBoxShadow = color =>
  `0px 1px 6px 0px ${color}, 0px 1px 2px 0px ${color}, 0px 2px 2px -1px ${color}`

const styles = {
  postCard: {
    boxShadow: defineBoxShadow(colors.blue),
    height: '250px',
    padding: '1em',
    '&:hover': {
      boxShadow: defineBoxShadow(colors.red),
      '& h3': {
        color: colors.red,
      },
    },
  },
  postCardBody: {
    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    '& p': {
      marginBottom: '0',
    },
  },
  sectionContainer: {
    marginTop: '4rem',
    marginBottom: '4rem',
  },
  sectionTitle: {
    color: colors.red,
    marginBottom: '1em',
  },
}

const SectionBlog = ({ classes }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          limit: 2
          sort: { fields: [fields___date], order: DESC }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
              }
              fields {
                date(formatString: "DD MMMM, YYYY")
                slug
              }
              excerpt(pruneLength: 120)
            }
          }
        }
      }
    `
  )

  const createPostCard = (to, body) => (
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <Paper className={classes.postCard}>
        <Link to={to} className={classes.postCardBody}>
          {body}
        </Link>
      </Paper>
    </Grid>
  )
  const latestPosts = data.allMarkdownRemark.edges.map(({ node }) =>
    createPostCard(
      node.fields.slug,
      <div>
        <div className="date">{node.fields.date}</div>
        <h3>{node.frontmatter.title}</h3>
        <p>{node.excerpt}</p>
      </div>
    )
  )
  const readMore = createPostCard('/blog', <h3>Read more...</h3>)

  return (
    <Container className={classes.sectionContainer} maxWidth="lg">
      <h2 className={classes.sectionTitle}>Latest writings</h2>
      <Grid container spacing={3}>
        {latestPosts}
        {readMore}
      </Grid>
    </Container>
  )
}

SectionBlog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SectionBlog)
