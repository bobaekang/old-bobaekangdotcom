import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Header from './header'
import Footer from './footer'
import '../styles/layout.css'

const useStyles = makeStyles({
  site: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  siteMain: {
    flexGrow: '1',
  },
})

const Layout = ({ children, currentPage }) => {
  const classes = useStyles()

  return (
    <div className={classes.site}>
      <Header currentPage={currentPage} />
      <main className={classes.siteMain}>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string,
}

Layout.defaultProps = {
  siteTitle: ``,
}

export default Layout
