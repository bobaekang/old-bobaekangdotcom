import React, { useState } from "react"
import { graphql } from "gatsby"

// material ui
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'

// components
import Layout from "../components/layout"


const styles = theme => ({
  blog: {
    marginTop: "8%"
  },
  date: {
    marginBottom: "1em",
    color: "#999"
  }
});


const blogPost = ({ classes, data }) => {
  const [section, setSection] = useState(2)
  const post = data.markdownRemark
  
  return (
    <Layout
      fullpageSection={section}
      onSectionChange={setSection}
    >
      <Container maxWidth="md">
        <h2>{post.frontmatter.title}</h2>
        <div className={classes.date}>{post.frontmatter.date}</div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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