import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import BlogPreview from '../components/blogPreview'
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
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(
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
                tags
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
    <Grid key={to} item xs={11} sm={8} md={6} lg={4}>
      <Paper className={classes.postCard}>
        <Link to={to} className={classes.postCardBody}>
          {body}
        </Link>
      </Paper>
    </Grid>
  )
  const latestPosts = edges.map(({ node }) =>
    createPostCard(
      node.fields.slug,
      <BlogPreview postNode={node} showAll={false}></BlogPreview>
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
