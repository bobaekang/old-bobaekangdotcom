import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'

// layout
import Layout from '../../components/layout'

// material ui
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'

// components
import BlogPreview from '../../components/blogPreview'
import LinkBackTo from '../../components/linkBackTo'
import SEO from '../../components/seo'

// styles
import colors from '../../styles/colors'

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
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string)
          }).isRequired,
          fields: PropTypes.shape({
            date: PropTypes.string,
            slug: PropTypes.string
          }).isRequired,
          excerpt: PropTypes.string.isRequired
        }).isRequired
      ),
    }),
  }),
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
