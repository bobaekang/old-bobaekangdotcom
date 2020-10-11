import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import BlogTags from '../components/blogTags'
import colors from '../styles/colors'

const useStyles = makeStyles({
  preview: {
    '&:hover': {
      '& h3': {
        color: colors.red,
      },
    },
  },
})

const BlogPreview = ({ postNode, showAll }) => {
  const classes = useStyles()

  const { excerpt, fields, frontmatter } = postNode

  return (
    <div>
      <span className="date">{fields.date}</span>
      <BlogTags tags={frontmatter.tags} showAll={showAll}></BlogTags>
      <Link to={fields.slug} className={classes.preview}>
        <h3>{frontmatter.title}</h3>
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
