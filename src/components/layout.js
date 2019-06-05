import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

// components
import Header from "./header"

// styles
import "../styles/layout.css"

const Layout = ({ children, fullpageSection, onSectionChange }) => {
  const handleSectionChange = index => onSectionChange(index)

  return ( 
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header
            siteTitle={data.site.siteMetadata.title}
            fullpageSection={fullpageSection}
            onSectionChange={index => handleSectionChange(index)}
          />
            <main>{children}</main>
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
