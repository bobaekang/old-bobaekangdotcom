import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'

import BlogPreview from '../components/blogPreview'
import Layout from '../components/layout'
import LinkBackTo from '../components/linkBackTo'
import SEO from '../components/seo'
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

const Tags = ({ classes, pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  const blogPosts = edges.map(({ node }) => (
    <Link to={node.fields.slug} key={node.id}>
      <BlogPreview postNode={node}></BlogPreview>
    </Link>
  ))

  return (
    <Layout currentPage={'blog'}>
      <SEO title={`Blog #${tag}`} />
      <Container className={classes.blog} maxWidth="md">
        <LinkBackTo to={{ name: 'All tags', path: '/blog/tags' }}></LinkBackTo>
        <h4>{tagHeader}</h4>
        {blogPosts}
      </Container>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default withStyles(styles)(Tags)

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            date(formatString: "DD MMMM, YYYY")
            slug
          }
          frontmatter {
            title
            tags
          }
          excerpt(pruneLength: 240)
        }
      }
    }
  }
`
