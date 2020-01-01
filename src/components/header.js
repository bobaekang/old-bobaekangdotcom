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
    '& a': {
      color: colors.blue,
      fontSize: '1.2rem',
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
  fullpageSection,
  isBlog,
  is404,
  onSectionChange,
}) => {
  const showLogo = fullpageSection !== 0
  const logo = (
    <Link to="/" className={classes.logo}>
      bobae kang
    </Link>
  )

  const isActiveItem = section =>
    fullpageSection === section ? classes.menuActiveItem : undefined
  const menuHome = (
    <Link to="/" onClick={() => onSectionChange(0)}>
      <span className={isActiveItem(0)}>home</span>
    </Link>
  )
  const menuAbout = (
    <Link to="/" onClick={() => onSectionChange(1)}>
      <span className={isActiveItem(1)}>about</span>
    </Link>
  )
  const menuBlog = (
    <Link to={isBlog ? '/blog' : '/'} onClick={() => onSectionChange(2)}>
      <span className={isActiveItem(2)}>blog</span>
    </Link>
  )
  const menuBlog2 = (
    <Link to="/blog" className={classes.menuItem}>
      <span className={classes.menuActiveItem}>blog</span>
    </Link>
  )
  const menuList = (
    <ul>
      <li className={classes.menuItem}>{!isBlog && menuHome}</li>
      <li className={classes.menuItem}>{!isBlog && menuAbout}</li>
      <li className={classes.menuItem}>{menuBlog}</li>
    </ul>
  )

  return (
    <header className={classes.header}>
      <Container maxWidth="lg">
        <Grid container direction="row" justify="space-between">
          <Grid item>{showLogo && logo}</Grid>
          <Grid item>
            <Hidden smDown>{!is404 && menuList}</Hidden>
            <Hidden mdUp>{!is404 && isBlog && menuBlog2}</Hidden>
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}

export default withStyles(styles)(Header)
