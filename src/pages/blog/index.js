import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Container from '@material-ui/core/Container'
import Layout from '../../components/layout'
import BlogPreview from '../../components/blogPreview'
import LinkBackTo from '../../components/linkBackTo'
import SEO from '../../components/seo'

const BlogPage = ({ data }) => {
  const { edges, totalCount } = data.allMarkdownRemark

  const blogPosts = edges.map(({ node }) => (
    <BlogPreview postNode={node} key={node.id}></BlogPreview>
  ))

  return (
    <Layout currentPage={'blog'}>
      <SEO title="Blog" />
      <Container className="mt-20" maxWidth="md">
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
          node: PropTypes.shape({
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
          }).isRequired,
        })
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
