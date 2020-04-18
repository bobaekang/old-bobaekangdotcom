import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Layout from '../../components/layout'
import BlogPreview from '../../components/blogPreview'
import LinkBackTo from '../../components/linkBackTo'
import SEO from '../../components/seo'
import colors from '../../styles/colors'

const useStyles = makeStyles({
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
})

const BlogPage = ({ data }) => {
  const classes = useStyles()

  const { edges, totalCount } = data.allMarkdownRemark

  const blogPosts = edges.map(({ node }) => (
    <Link to={node.fields.slug} key={node.id}>
      <BlogPreview postNode={node}></BlogPreview>
    </Link>
  ))

  return (
    <Layout currentPage={'blog'}>
      <SEO title="Blog" />
      <Container className={classes.blog} maxWidth="md">
        <LinkBackTo to={{ name: 'Home', path: '/' }}></LinkBackTo>
        <h4>{totalCount} posts</h4>
        {blogPosts}
      </Container>
    </Layout>
  )
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string),
          }).isRequired,
          fields: PropTypes.shape({
            date: PropTypes.string,
            slug: PropTypes.string,
          }).isRequired,
          excerpt: PropTypes.string.isRequired,
        }).isRequired
      ),
    }),
  }),
}

export default BlogPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      totalCount
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
          excerpt(pruneLength: 240)
        }
      }
    }
  }
`
