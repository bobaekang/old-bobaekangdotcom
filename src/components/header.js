import React from 'react'
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
    position: 'absolute',
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
    '& a': {
      color: colors.blue,
      paddingLeft: '2.0rem',
      '&:hover': {
        color: colors.red,
      },
    },
  },
  navActiveItem: {
    color: colors.red,
  },
}

const Header = ({
  classes,
  currentPage,
  fullpageSection,
  setFullpageSection,
}) => {
  // logo
  const hideLogo = currentPage === 'index' && fullpageSection === 0
  const logo = (
    <Link to="/" className={classes.logo}>
      bobae kang
    </Link>
  )

  // index page
  const isActiveItem = section =>
    fullpageSection === section ? classes.navActiveItem : undefined
  const createNavIndexItem = (sectionName, sectionIndex) => (
    <Link to="/" onClick={() => setFullpageSection(sectionIndex)}>
      <span className={isActiveItem(sectionIndex)}>{sectionName}</span>
    </Link>
  )
  const indexSections = ['home', 'about', 'blog']
  const navIndex = (
    <ul>
      {indexSections.map((name, index) => (
        <li className={classes.navItem}>{createNavIndexItem(name, index)}</li>
      ))}
    </ul>
  )

  // blog page
  const navBlog = (
    <Link to="/blog" className={classes.navItem}>
      <span className={classes.navActiveItem}>blog</span>
    </Link>
  )

  return (
    <header className={classes.header}>
      <Container maxWidth="lg">
        <Grid container direction="row" justify="space-between">
          <Grid item>{!hideLogo && logo}</Grid>
          <Grid item>
            {currentPage === 'index' && <Hidden smDown>{navIndex}</Hidden>}
            {currentPage === 'blog' && navBlog}
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}

export default withStyles(styles)(Header)
