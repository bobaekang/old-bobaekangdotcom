import React from "react"
import { Link } from "gatsby"

// material ui
import { withStyles } from '@material-ui/core/styles'

// components
import Layout from "../components/layout"
import SEO from "../components/seo"

// styles
import colors from '../styles/colors.js'
import { Container } from "@material-ui/core"

const styles = {
  notFound: {
    marginTop: '5rem',
    '& h1': {
      color: colors.red
    },
    '& a': {
      color: colors.blue,
      textDecoration: 'underline',
      '&:hover': {
        color: colors.red
      }
    }
  }
}

const NotFoundPage = ({classes}) => (
  <Layout>
    <SEO title="404: Not found" />
    <Container className={classes.notFound} maxWidth="md">
      <h1>page not found 😬</h1>
      <p>The page you're looking for does not exist (404 Error).</p>
      <p>Back to <Link to="/">Homepage</Link> or <Link to="/blog">Blog page</Link>.</p>
    </Container>
  </Layout>
)

export default withStyles(styles)(NotFoundPage)
