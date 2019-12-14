import React, { useState } from "react"
import { graphql, Link } from "gatsby"

// layout
import Layout from "../components/layout"

// material ui
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { withStyles } from '@material-ui/core/styles'

// components
import SEO from "../components/seo"

// styles
import colors from '../styles/colors'

const styles = {
  blog: {
    paddingTop: "5rem",
    paddingBottom: '5rem'
  },
  blogBody: {
    '& h2': {
      fontSize: '1.2rem'
    },
    '& h3': {
      fontSize: '1rem'
    },
    '& h4': {
      fontSize: '85028rem'
    },
    '& a': {
      color: colors.blue,
      textDecoration: 'underline',
      '& code': {
        color: colors.blue,
      },
      '&:hover': {
        color: colors.red,
        '& code': {
          color: colors.red,
        }
      }
    },
    '& .footnotes': {
      fontSize: '.8rem'
    }
  },
  blogHeader: {
    paddingBottom: "1rem",
    '& .date': {
      color: colors.darkgrey,
      fontFamily: '"Roboto Slab", san-serif',
      fontSize: '16px'
    }
  },
  navIcon: {
    position: "relative",
    top: ".25rem"
  },
  navLink: {
    color: colors.blue,
    '&:hover': {
      color: colors.red
    }
  }
}

const BlogPost = ({ classes, data, pageContext }) => {
  const [section, setSection] = useState(2)
  const post = data.markdownRemark
  const { next, prev } = pageContext

  return (
    <Layout
      fullpageSection={section}
      isBlog={true}
      onSectionChange={setSection}
    >
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Container className={classes.blog} maxWidth="md">
        <div className={classes.blogHeader}>
          <div class="date">{post.frontmatter.date}</div>
          <h1>{post.frontmatter.title}</h1>
        </div>
        <div
          className={classes.blogBody}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={5}>
            {
              prev &&
              <Link
                className={classes.navLink}
                to={prev.fields.slug}
              >
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={2}>
                    <KeyboardArrowLeftIcon className={classes.navIcon}/>
                  </Grid>
                  <Grid item xs={10}>
                    <h4 style={{marginBottom: "0"}}>{prev.frontmatter.title}</h4>
                  </Grid>
                </Grid>             
              </Link>
            }
          </Grid>
          <Grid item xs={5}>
            {
              next &&
              <Link
                className={classes.navLink}
                style={{
                  textAlign: 'right'
                }}
                to={next.fields.slug}
              >
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={10}>
                    <h4 style={{marginBottom: "0"}}>{next.frontmatter.title}</h4>
                  </Grid>
                  <Grid item xs={2}>
                    <KeyboardArrowRightIcon className={classes.navIcon}/>
                  </Grid>
                </Grid>
              </Link>
            }
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default withStyles(styles)(BlogPost)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
      excerpt(pruneLength: 80)
    }
  }
`