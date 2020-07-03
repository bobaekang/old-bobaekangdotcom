import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import BlogPreview from '../components/blogPreview'
import colors from '../styles/colors'

const defineBoxShadow = color =>
  `0px 1px 6px 0px ${color}, 0px 1px 2px 0px ${color}, 0px 2px 2px -1px ${color}`

const useStyles = makeStyles({
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
})

const SectionBlog = () => {
  const classes = useStyles()

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

  const latestPosts = edges.map(({ node }) => (
    <Grid item xs={11} sm={8} md={6} lg={4} key={node.id}>
      <Paper className={classes.postCard}>
        <div className={classes.postCardBody}>
          <BlogPreview postNode={node} showAll={false}></BlogPreview>
        </div>
      </Paper>
    </Grid>
  ))

  const readMore = (
    <Grid item xs={11} sm={8} md={6} lg={4}>
      <Paper className={classes.postCard}>
        <Link to={'/blog'} className={classes.postCardBody}>
          <h3>Read more...</h3>
        </Link>
      </Paper>
    </Grid>
  )

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

export default SectionBlog
