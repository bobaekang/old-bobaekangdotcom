import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'

// layout
import Layout from '../../components/layout'

// material ui
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'

// components
import SEO from '../../components/seo'
import LinkBackTo from '../../components/linkBackTo'

// styles
import colors from '../../styles/colors'

const styles = {
  blog: {
    marginTop: '5rem',
  },
  tag: {
    display: 'block',
    '&:hover': {
      color: colors.red,
      textDecoration: 'underline',
    },
  },
}

const TagsPage = ({ classes, data }) => {
  const tags = data.allMarkdownRemark.group.map(tag => (
    <Link
      className={classes.tag}
      to={`/blog/tags/${tag.fieldValue.replace(' ', '-')}/`}
    >
      #{tag.fieldValue} ({tag.totalCount})
    </Link>
  ))

  return (
    <Layout currentPage={'blog'}>
      <SEO title="Blog tags" />
      <Container className={classes.blog} maxWidth="md">
        <LinkBackTo to={{ name: 'Blog', path: '/blog' }}></LinkBackTo>
        <h4>All tags</h4>
        {tags}
      </Container>
    </Layout>
  )
}

TagsPage.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(TagsPage)

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
