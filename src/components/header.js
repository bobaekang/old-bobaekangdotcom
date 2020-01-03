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
  menuItem: {
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
  menuActiveItem: {
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
  const showLogo = fullpageSection !== 0
  const logo = (
    <Link to="/" className={classes.logo}>
      bobae kang
    </Link>
  )

  // navigation home
  const isHome = currentPage === 'home'
  const isActiveItem = section =>
    fullpageSection === section ? classes.menuActiveItem : undefined
  const createNavHomeItem = (sectionName, sectionIndex) => (
    <Link to="/" onClick={() => setFullpageSection(sectionIndex)}>
      <span className={isActiveItem(sectionIndex)}>{sectionName}</span>
    </Link>
  )
  const homeSections = ['home', 'about', 'blog']
  const navHome = (
    <ul>
      {homeSections.map((name, index) => (
        <li className={classes.menuItem}>{createNavHomeItem(name, index)}</li>
      ))}
    </ul>
  )

  // navigation blog
  const isBlog = currentPage === 'blog'
  const navBlog = (
    <Link to="/blog" className={classes.menuItem}>
      <span className={classes.menuActiveItem}>blog</span>
    </Link>
  )

  return (
    <header className={classes.header}>
      <Container maxWidth="lg">
        <Grid container direction="row" justify="space-between">
          <Grid item>{showLogo && logo}</Grid>
          <Grid item>
            {isHome && <Hidden smDown>{navHome}</Hidden>}
            {isBlog && navBlog}
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}

export default withStyles(styles)(Header)
