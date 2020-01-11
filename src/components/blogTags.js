import React from 'react'
import { Link } from 'gatsby'

// material ui
import { withStyles } from '@material-ui/core/styles'

// styles
import colors from '../styles/colors'

const styles = {
  blogTags: {
    color: colors.darkgrey,
    fontSize: '16px',
    '&:before': {
      content: '" · "',
    },
    '& .tag': {
      '&:after': {
        content: '" "',
      },
      '&:hover': {
        color: colors.red,
      },
    },
  },
}

const BlogTags = ({ classes, tags, showAll = true }) => {
  const tagLink = tag => (
    <Link className="tag" to={`/blog/tags/${tag.replace(' ', '-')}`}>
      #{tag}
    </Link>
  )

  return (
    tags &&
    tags.length > 0 &&
    (showAll ? (
      <span className={classes.blogTags}>{tags.map(tag => tagLink(tag))}</span>
    ) : (
      <span className={classes.blogTags}>
        {tagLink(tags[0])} +{tags.length - 1}
      </span>
    ))
  )
}
export default withStyles(styles)(BlogTags)
