import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Layout from '../components/layout'
import LinkBackTo from '../components/linkBackTo'
import SEO from '../components/seo'
import colors from '../styles/colors.js'

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
      <h1>
        page not found{' '}
        <span aria-label="jsx-a11y/accessible-emoji" role="img">
          😬
        </span>
      </h1>
      <p>The page you're looking for does not exist (404 Error).</p>
    </Container>
  </Layout>
)

NotFoundPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotFoundPage)
