import React from 'react'
import PropTypes from 'prop-types'

// styles
import '../styles/layout.css'

// material-ui
import { withStyles } from '@material-ui/core/styles'

// components
import Header from './header'
import Footer from './footer'

const styles = {
  site: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  siteMain: {
    flexGrow: '1',
  },
}

const Layout = ({
  children,
  classes,
  currentPage,
  fullpageSection,
  setFullpageSection,
}) => (
  <div className={classes.site}>
    <Header
      currentPage={currentPage}
      fullpageSection={currentPage === 'index' ? fullpageSection : null}
      setFullpageSection={currentPage === 'index' ? setFullpageSection : null}
    />
    <main className={classes.siteMain}>{children}</main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string,
}

Layout.defaultProps = {
  siteTitle: ``,
}

export default withStyles(styles)(Layout)
