import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import BlogPreview from '../components/blogPreview'
import Layout from '../components/layout'
import LinkBackTo from '../components/linkBackTo'
import SEO from '../components/seo'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <Layout currentPage={'blog'}>
      <SEO title={`Blog #${tag}`} />
      <div className="max-w-[960px] mx-auto px-[24px] mt-20">
        <LinkBackTo to={{ name: 'All tags', path: '/blog/tags' }}></LinkBackTo>
        <h4>{tagHeader}</h4>
        {edges.map(({ node }) => (
          <BlogPreview key={node.id} postNode={node} />
        ))}
      </div>
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

export default Tags

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
          id
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
