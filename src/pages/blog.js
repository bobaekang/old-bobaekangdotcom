import React, { useState } from "react"
import { Link, graphql } from "gatsby"

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

const Blog = ({ classes, data }) => {
  const [section, setSection] = useState(2)
  return (
    <Layout
      fullpageSection={section}
      isBlog={true}
      onSectionChange={() => {}}
    >
      <Container maxWidth="md">
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {
          data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
              <Link
                to={node.fields.slug}
              >
                <h3>
                  {node.frontmatter.title}{" "}
                  <span>
                    — {node.frontmatter.date}
                  </span>
                </h3>
                <p>{node.excerpt}</p>
              </Link> 
            </div>
          ))
        }
      </Container>
    </Layout>
  )
}

export default withStyles(styles)(Blog)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`