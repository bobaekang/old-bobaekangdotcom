import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Layout from '../components/layout'
import SectionAbout from '../components/sectionAbout'
import SectionBlog from '../components/sectionBlog'
import SectionHome from '../components/sectionHome'
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

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(IndexPage)
