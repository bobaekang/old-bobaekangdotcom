import React from 'react'
import { Container } from '@material-ui/core'
import Layout from '../components/layout'
import LinkBackTo from '../components/linkBackTo'
import SEO from '../components/seo'

const NotFoundPage = () => {
  return (
    <Layout currentPage={'404'}>
      <SEO title="404: Not found" />
      <Container className="mt-20" maxWidth="md">
        <LinkBackTo to={{ name: 'Home', path: '/' }}></LinkBackTo>
        <h1 className="text-red">
          page not found{' '}
          <span aria-label="jsx-a11y/accessible-emoji" role="img">
            😬
          </span>
        </h1>
        <p>The page you're looking for does not exist (404 Error).</p>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
