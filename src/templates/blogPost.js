import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import BlogTags from '../components/blogTags'
import Layout from '../components/layout'
import LinkBackTo from '../components/linkBackTo'
import SEO from '../components/seo'

const BlogPost = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { next, prev } = pageContext

  const blogHeader = (
    <div className="pb-4">
      <span className="date">{post.fields.date}</span>
      <BlogTags tags={post.frontmatter.tags}></BlogTags>
      <h1>{post.frontmatter.title}</h1>
    </div>
  )
  const blogBody = (
    <div
      className="blog-body"
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
  )
  const toPrevPost = prev && (
    <Link className="text-blue hover:text-red" to={prev.fields.slug}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={2}>
          <KeyboardArrowLeftIcon className="relative top-1" />
        </Grid>
        <Grid item xs={10}>
          <h4 style={{ marginBottom: '0' }}>{prev.frontmatter.title}</h4>
        </Grid>
      </Grid>
    </Link>
  )
  const toNextPost = next && (
    <Link className="text-blue hover:text-red text-right" to={next.fields.slug}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={10}>
          <h4 style={{ marginBottom: '0' }}>{next.frontmatter.title}</h4>
        </Grid>
        <Grid item xs={2}>
          <KeyboardArrowRightIcon className="relative top-1" />
        </Grid>
      </Grid>
    </Link>
  )
  const blogNavigation = (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={5}>
        {toPrevPost}
      </Grid>
      <Grid item xs={5}>
        {toNextPost}
      </Grid>
    </Grid>
  )

  return (
    <Layout currentPage={'blog'}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div className="max-w-[960px] mx-auto px-[24px] py-20">
        <LinkBackTo to={{ name: 'Blog', path: '/blog' }}></LinkBackTo>
        {blogHeader}
        {blogBody}
        {blogNavigation}
      </div>
    </Layout>
  )
}

BlogPost.propTypes = {
  markdownRemark: PropTypes.shape({
    html: PropTypes.string.isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    fields: PropTypes.shape({
      date: PropTypes.string.isRequired,
    }).isRequired,
    excerpt: PropTypes.string.isRequired,
  }),
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
      }
      fields {
        date(formatString: "DD MMMM, YYYY")
      }
      excerpt(pruneLength: 80)
    }
  }
`
