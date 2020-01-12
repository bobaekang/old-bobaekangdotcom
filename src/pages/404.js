import React from 'react'

// material ui
import { withStyles } from '@material-ui/core/styles'

// components
import Layout from '../components/layout'
import LinkBackTo from '../components/linkBackTo'
import SEO from '../components/seo'

// styles
import colors from '../styles/colors.js'
import { Container } from '@material-ui/core'

const styles = {
  notFound: {
    marginTop: '5rem',
    '& h1': {
      color: colors.red,
    },
  },
}

const NotFoundPage = ({ classes }) => (
  <Layout currentPage={'404'}>
    <SEO title="404: Not found" />
    <Container className={classes.notFound} maxWidth="md">
      <LinkBackTo to={{ name: 'Home', path: '/' }}></LinkBackTo>
      <h1>page not found 😬</h1>
      <p>The page you're looking for does not exist (404 Error).</p>
    </Container>
  </Layout>
)

export default withStyles(styles)(NotFoundPage)
