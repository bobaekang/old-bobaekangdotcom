import React from "react"
import { Link } from "gatsby"

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
    position:'absolute',
    width:'100%',
    zIndex:'99'
  },
  logo: {
    backgroundColor: colors.red,
    color: 'white',
    fontSize: '1.6rem',
    padding: '0 0.15rem 0.8rem'
  },
  menulist: {
    float: 'left',
    listStyleType: 'none',
    paddingTop: '0.1rem',
  },
  menuItem: {
    color: colors.blue,
    fontSize: '1.2rem',
    paddingLeft: '2.0rem',
    '&:hover': {
      color: colors.red
    }
  },
  menuActiveItem: {
    color: colors.red
  }
}

const Header = ({ classes, fullpageSection, isBlog, onSectionChange }) => {
  const onClickMenu = index => onSectionChange(index)
  const showLogo = fullpageSection !== 0
  
  return (
    <header className={classes.header}>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="space-between"
        >
          <Grid item>
            {
              showLogo && 
              <Link to="/" className={classes.logo}>bobae kang</Link>
            }
          </Grid>

          <Grid item>
            <Hidden smDown>
              <ul>
                <li className={classes.menulist}>
                  <Link
                    to="/"
                    className={classes.menuItem}
                    onClick={() => onClickMenu(0)}
                  >
                    {
                      !isBlog &&
                      <span
                        className={
                          fullpageSection ===  0 ?
                          classes.menuActiveItem :
                          undefined
                        }
                      >
                        home
                      </span>
                    }
                  </Link>
                </li>
                <li className={classes.menulist}>
                  <Link
                    to="/"
                    className={classes.menuItem}
                    onClick={() => onClickMenu(1)}
                  >
                    {
                      !isBlog &&
                      <span
                        className={
                          fullpageSection === 1 ?
                          classes.menuActiveItem :
                          undefined
                        }
                      >
                        about
                      </span>
                    }
                  </Link>
                </li>
                <li className={classes.menulist}>
                  <Link
                    to={isBlog ? "/blog" :  "/"}
                    className={classes.menuItem}
                    onClick={() => onClickMenu(2)}
                  >
                    <span
                      className={
                        fullpageSection === 2 ?
                        classes.menuActiveItem :
                        undefined}
                    >
                      blog
                    </span>
                  </Link>
                </li>
              </ul>
            </Hidden>
            
            <Hidden mdUp>
              {
                isBlog &&              
                <Link to="/blog" className={classes.menuItem}>
                  <span className={classes.menuActiveItem}>blog</span>
                </Link>
              }
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}

export default withStyles(styles)(Header)
