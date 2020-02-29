import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import BlogTags from '../components/blogTags'
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

BlogPreview.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(BlogPreview)
