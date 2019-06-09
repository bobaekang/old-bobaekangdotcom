import React, { useState } from "react"
import { graphql } from "gatsby"

// material ui
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'

// components
import Layout from "../components/layout"

// styles
import colors from '../styles/colors'

const styles = theme => ({
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
    marginTop: "5%"
  },
  date: {
    marginBottom: "1em",
    color: colors.darkgrey
  }
});


const blogPost = ({ classes, data }) => {
  const [section, setSection] = useState(2)
  const post = data.markdownRemark
  
  return (
    <Layout
      fullpageSection={section}
      isBlog={true}
      onSectionChange={setSection}
    >
      <Container className={classes.blog} maxWidth="md">
        <h2>{post.frontmatter.title}</h2>
        <div className={classes.date}>{post.frontmatter.date}</div>
        <div className={classes.article} dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
    </Layout>
  )
}

export default withStyles(styles)(blogPost)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`