import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

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
  onSectionChange,
}) => {
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
        <div className={classes.site}>
          <Header
            siteTitle={data.site.siteMetadata.title}
            fullpageSection={fullpageSection}
            isBlog={isBlog}
            onSectionChange={index => handleSectionChange(index)}
          />
          <main className={classes.siteMain}>{children}</main>
          <Footer />
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string,
}

Layout.defaultProps = {
  siteTitle: ``,
}

export default withStyles(styles)(Layout)
