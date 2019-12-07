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
    position:'absolute',
    width:'100%',
    zIndex:'99'
  },
  container: {
    height: '46px',
    padding: '0'
  },
  logo: {
    marginBottom: '0',
    backgroundColor: '#FF240E',
    color: 'white',
    textDecoration: 'none'
  },
  menulist: {
    float: 'left',
    listStyleType: 'none',
    marginTop: '2%'
  },
  menuItem: {
    color: colors.blue,
    fontFamily: 'Ubuntu, san-serif',
    fontSize: '1.3em',
    fontWeight: '700',
    paddingLeft: '1em',
    paddingRight: '1em',
    textDecoration: 'none',
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
  
  return (
    <header className={classes.header}>
      <Container className={classes.container} maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="space-between"
        >
          <Grid item>
            {
              fullpageSection > 0 && 
              <h1 style={{margindBottom:'0'}}>
                <Link to="/" className={classes.logo}>bobae kang</Link>
              </h1>
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
