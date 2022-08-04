import React from 'react'
import Layout from '../components/layout'
import SectionAbout from '../components/sectionAbout'
import SectionBlog from '../components/sectionBlog'
import SectionHome from '../components/sectionHome'
import SEO from '../components/seo'
import AreYouInterviewer from '../components/AreYouInterviewer'

const IndexPage = () => {
  const sectionClassName =
    'flex flex-wrap min-h-screen items-center max-w-[960px] mx-auto px-[24px]'
  return (
    <Layout currentPage={'index'}>
      <SEO title="Home" />
      <AreYouInterviewer />
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
