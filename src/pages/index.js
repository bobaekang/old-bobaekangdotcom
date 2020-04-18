import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Layout from '../components/layout'
import SectionAbout from '../components/sectionAbout'
import SectionBlog from '../components/sectionBlog'
import SectionHome from '../components/sectionHome'
import SEO from '../components/seo'

const useStyles = makeStyles({
  section: {
    minHeight: '100vh',
    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
})

const IndexPage = () => {
  const classes = useStyles()

  return (
    <Layout currentPage={'index'}>
      <SEO title="Home" />
      <div id="home" className={classes.section}>
        <SectionHome />
      </div>
      <div id="about" className={classes.section}>
        <SectionAbout />
      </div>
      <div id="blog" className={classes.section}>
        <SectionBlog />
      </div>
    </Layout>
  )
}

export default IndexPage
