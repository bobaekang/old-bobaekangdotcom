import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import BlogTags from '../components/blogTags'

const BlogPreview = ({ postNode, showAll }) => {
  const { excerpt, fields, frontmatter } = postNode

  return (
    <div>
      <span className="date">{fields.date}</span>
      <BlogTags tags={frontmatter.tags} showAll={showAll}></BlogTags>
      <Link to={fields.slug}>
        <h3 className="hover:text-red">{frontmatter.title}</h3>
        <p>{excerpt}</p>
      </Link>
    </div>
  )
}

BlogPreview.propTypes = {
  postNode: PropTypes.shape({
    excerpt: PropTypes.string.isRequired,
    fields: PropTypes.shape({
      date: PropTypes.string.isRequired,
    }).isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  showAll: PropTypes.bool,
}

export default BlogPreview
