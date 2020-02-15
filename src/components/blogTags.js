import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'

import colors from '../styles/colors'

const styles = {
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
}

const BlogTags = ({ classes, tags, showAll = true }) => {
  const tagLink = tag => (
    <Link className={classes.tag} to={`/blog/tags/${tag.replace(' ', '-')}`}>
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
  showAll: PropTypes.bool.isRequired,
}

export default withStyles(styles)(BlogTags)
