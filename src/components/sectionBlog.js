import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import BlogPreview from '../components/blogPreview'
import colors from '../styles/colors'

const useStyles = makeStyles({
  sectionContainer: {
    marginTop: '4rem',
    marginBottom: '4rem',
  },
  sectionTitle: {
    color: colors.red,
    marginBottom: '1em',
  },
  readMore: {
    '& h3': {
      marginTop: '2.5rem',
      '&:hover': {
        color: colors.red,
      },
    },
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
              excerpt(pruneLength: 100)
            }
          }
        }
      }
    `
  )

  return (
    <Container className={classes.sectionContainer} maxWidth="md">
      <h2 className={classes.sectionTitle}>Latest writings</h2>
      {edges.map(({ node }) => (
        <BlogPreview
          key={node.id}
          postNode={node}
          showAll={false}
        ></BlogPreview>
      ))}
      <Link to={'/blog'} className={classes.readMore}>
        <h3>Read more...</h3>
      </Link>
    </Container>
  )
}

export default SectionBlog
