import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'

// layout
import Layout from '../components/layout'

// material ui
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'

// components
import SEO from '../components/seo'

// styles
import colors from '../styles/colors'

const styles = {
  blog: {
    marginTop: '5rem',
  },
  preview: {
    marginBottom: '2rem',
    '&:hover': {
      '& h3': {
        color: colors.red,
      },
    },
  },
}

const BlogPage = ({ classes, data }) => {
  const blogPosts = data.allMarkdownRemark.edges.map(({ node }) => (
    <Link to={node.fields.slug} key={node.id}>
      <div className={classes.preview}>
        <div className="date">{node.fields.date}</div>
        <h3>{node.frontmatter.title}</h3>
        <p>{node.excerpt}</p>
      </div>
    </Link>
  ))

  return (
    <Layout currentPage={'blog'}>
      <SEO title="Blog" />
      <Container className={classes.blog} maxWidth="md">
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {blogPosts}
      </Container>
    </Layout>
  )
}

BlogPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BlogPage)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      totalCount
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
          excerpt(pruneLength: 240)
        }
      }
    }
  }
`
