import React from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import '../styles/layout.css'

const Layout = ({ children, currentPage }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPage={currentPage} />
      <main className="flex-1">{children}</main>
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
