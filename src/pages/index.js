import React from 'react'
import Layout from '../components/layout'
import SectionAbout from '../components/sectionAbout'
import SectionBlog from '../components/sectionBlog'
import SectionHome from '../components/sectionHome'
import SEO from '../components/seo'

const IndexPage = () => {
  const sectionClassName = 'flex flex-wrap min-h-screen items-center'
  return (
    <Layout currentPage={'index'}>
      <SEO title="Home" />
      <div id="home" className={sectionClassName}>
        <SectionHome />
      </div>
      <div id="about" className={sectionClassName}>
        <SectionAbout />
      </div>
      <div id="blog" className={sectionClassName}>
        <SectionBlog />
      </div>
    </Layout>
  )
}

export default IndexPage
