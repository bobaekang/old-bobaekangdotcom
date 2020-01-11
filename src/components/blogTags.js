import React from 'react'

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

const BlogTags = ({ classes, tags, showAll = true }) =>
  tags &&
  tags.length > 0 &&
  (showAll ? (
    <span className={classes.blogTags}>
      {tags.map(tag => (
        <span className="tag">#{tag}</span>
      ))}
    </span>
  ) : (
    <span className={classes.blogTags}>
      <span className="tag">#{tags[0]}</span>+{tags.length - 1}
    </span>
  ))
export default withStyles(styles)(BlogTags)
