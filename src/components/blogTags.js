import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const BlogTags = ({ tags, showAll = true }) => {
  const tagLink = tag => (
    <Link
      className="hover:text-red hover:underline ml-1"
      key={tag}
      to={`/blog/tags/${tag.replace(' ', '-')}`}
    >
      #{tag}
    </Link>
  )

  return (
    tags &&
    tags.length > 0 &&
    (showAll ? (
      <span className="text-darkgrey text-[16px] before:content-['·'] before:ml-1">
        {tags.map(tag => tagLink(tag))}
      </span>
    ) : (
      <span className="text-darkgrey text-[16px] before:content-['·'] before:ml-1">
        {tagLink(tags[0])}
        {tags.length > 1 && `+${tags.length - 1}`}
      </span>
    ))
  )
}

BlogTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  showAll: PropTypes.bool,
}

export default BlogTags
