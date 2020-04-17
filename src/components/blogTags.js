import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import colors from '../styles/colors'

const useStyles = makeStyles({
  tag: {
    '&:after': {
      content: '" "',
    },
    '&:hover': {
      color: colors.red,
      textDecoration: 'underline',
    },
  },
  tags: {
    color: colors.darkgrey,
    fontSize: '16px',
    '&:before': {
      content: '" · "',
    },
  },
})

const BlogTags = ({ tags, showAll = true }) => {
  const classes = useStyles()

  const tagLink = tag => (
    <Link
      className={classes.tag}
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
      <span className={classes.tags}>{tags.map(tag => tagLink(tag))}</span>
    ) : (
      <span className={classes.tags}>
        {tagLink(tags[0])}
        {tags.length > 1 && `+${tags.length - 1}`}
      </span>
    ))
  )
}

BlogTags.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  showAll: PropTypes.bool,
}

export default BlogTags
