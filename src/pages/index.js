import React from 'react'

// layout
import Layout from '../components/layout'

// material ui
import { withStyles } from '@material-ui/core/styles'

// components
import SectionHome from '../components/sectionHome'
import SectionAbout from '../components/sectionAbout'
import SectionBlog from '../components/sectionBlog'
import SEO from '../components/seo'

const styles = {
  section: {
    minHeight: '100vh',
    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
}

const IndexPage = ({ classes }) => (
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

export default withStyles(styles)(IndexPage)
