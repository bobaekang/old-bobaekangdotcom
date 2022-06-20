import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import LinkBackTo from '../../components/linkBackTo'

const TagsPage = ({ data }) => {
  const tags = data.allMarkdownRemark.group.map(tag => (
    <Link
      className="block hover:text-red hover:underline"
      key={tag.fieldValue}
      to={`/blog/tags/${tag.fieldValue.replace(' ', '-')}/`}
    >
      #{tag.fieldValue} ({tag.totalCount})
    </Link>
  ))

  return (
    <Layout currentPage={'blog'}>
      <SEO title="Blog tags" />
      <div className="max-w-[960px] mx-auto px-[24px] mt-20">
        <LinkBackTo to={{ name: 'Blog', path: '/blog' }}></LinkBackTo>
        <h4>All tags</h4>
        {tags}
      </div>
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
