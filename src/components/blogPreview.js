import React from 'react'

// material ui
import { withStyles } from '@material-ui/core/styles'

// components
import BlogTags from '../components/blogTags'

// styles
import colors from '../styles/colors'

const styles = {
  preview: {
    '&:hover': {
      '& h3': {
        color: colors.red,
      },
    },
  },
}

const BlogPreview = ({
  classes,
  postNode: { excerpt, fields, frontmatter },
  showAll,
}) => (
  <div className={classes.preview}>
    <span className="date">{fields.date}</span>
    <BlogTags tags={frontmatter.tags} showAll={showAll}></BlogTags>
    <h3>{frontmatter.title}</h3>
    <p>{excerpt}</p>
  </div>
)

export default withStyles(styles)(BlogPreview)
