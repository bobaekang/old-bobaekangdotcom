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
  fullpageSection,
  isBlog,
  is404,
  onSectionChange,
}) => (
  <div className={classes.site}>
    <Header
      fullpageSection={fullpageSection}
      isBlog={isBlog}
      is404={is404}
      onSectionChange={index => onSectionChange(index)}
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
