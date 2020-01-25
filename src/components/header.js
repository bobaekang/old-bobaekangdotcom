import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

// material ui
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { withStyles } from '@material-ui/core/styles'

// styles
import colors from '../styles/colors'

const styles = {
  header: {
    backgroundColor: 'white',
    fontFamily: 'Ubuntu, san-serif',
    fontWeight: '700',
    height: '2.4rem',
    position: 'fixed',
    width: '100%',
    zIndex: '99',
  },
  logo: {
    backgroundColor: colors.red,
    color: 'white',
    fontSize: '1.6rem',
    padding: '0 0.15rem 0.8rem',
  },
  navItem: {
    float: 'left',
    listStyleType: 'none',
    paddingTop: '0.1rem',
    fontSize: '1.2rem',
    color: colors.blue,
    paddingLeft: '2.0rem',
    '&:hover': {
      color: colors.red,
    },
  },
  navActiveItem: {
    color: colors.red,
  },
}

const Header = ({ classes, currentPage }) => {
  // logo
  const [hideLogo, setHideLogo] = useState(currentPage === 'index')
  const logo = (
    <Link to="/" className={classes.logo}>
      bobae kang
    </Link>
  )

  // index page
  const [activeSection, setActiveSection] = useState('home')
  const indexSections = ['home', 'about', 'blog']

  const navItemClass = active =>
    [classes.navItem, active ? classes.navActiveItem : undefined].join(' ')
  const navIndex = indexSections.map(s => (
    <Link to={`/#${s}`} className={navItemClass(activeSection === s)}>
      {section}
    </Link>
  ))

  useEffect(() => {
    const onScroll = e => {
      indexSections.forEach(s => {
        if (
          document.querySelector(`#${s}`).getBoundingClientRect().top <
          e.target.documentElement.scrollTop
        ) {
          setActiveSection(s)
          setHideLogo(activeSection === 'home')
        }
      })
    }

    if (currentPage === 'index') window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [activeSection])

  // blog page
  const navBlog = (
    <Link to="/blog" className={navItemClass(true)}>
      blog
    </Link>
  )

  return (
    <header className={classes.header}>
      <Container maxWidth="lg">
        <Grid container direction="row" justify="space-between">
          <Grid item>{!hideLogo && logo}</Grid>
          <Grid item>
            <Hidden xsDown>{currentPage === 'index' && navIndex}</Hidden>
            {currentPage === 'blog' && navBlog}
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}

export default withStyles(styles)(Header)
