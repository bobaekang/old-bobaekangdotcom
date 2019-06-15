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

// styles
import colors from '../styles/colors'

const styles = {
  article: {
    '& h2': {
      fontSize: '1.2rem'
    },
    '& h3': {
      fontSize: '1rem'
    },
    '& h4': {
      fontSize: '85028rem'
    },
  },
  blog: {
    paddingTop: "5rem"
  },
  date: {
    marginBottom: "1em",
    color: colors.darkgrey
  },
  navIcon: {
    position: "relative"
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
      <Container className={classes.blog} maxWidth="md">
        <h2>{post.frontmatter.title}</h2>
        <div className={classes.date}>{post.frontmatter.date}</div>
        <div
          className={classes.article}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={3}>
            {
              prev &&
              <Link
                className={classes.navLink}
                to={prev.fields.slug}
              >
                <h4>
                  <KeyboardArrowLeftIcon className={classes.navIcon}/>
                  {prev.frontmatter.title}
                </h4>
              </Link>
            }
          </Grid>
          <Grid item xs={3}>
            {
              next &&
              <Link
                className={classes.navLink}
                style={{
                  textAlign: 'right'
                }}
                to={next.fields.slug}
              >
                <h4>
                  {next.frontmatter.title}
                  <KeyboardArrowRightIcon className={classes.navIcon}/>
                </h4>
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
    }
  }
`