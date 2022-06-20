import React from 'react'
import Layout from '../components/layout'
import LinkBackTo from '../components/linkBackTo'
import SEO from '../components/seo'

const NotFoundPage = () => {
  return (
    <Layout currentPage={'404'}>
      <SEO title="404: Not found" />
      <div className="max-w-[960px] mx-auto px-[24px] mt-20">
        <LinkBackTo to={{ name: 'Home', path: '/' }}></LinkBackTo>
        <h1 className="text-red">
          page not found{' '}
          <span aria-label="jsx-a11y/accessible-emoji" role="img">
            😬
          </span>
        </h1>
        <p>The page you're looking for does not exist (404 Error).</p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
