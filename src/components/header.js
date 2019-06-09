import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

// material ui
import { withStyles } from '@material-ui/core/styles'

// styles
import colors from '../styles/colors'

const styles = theme => ({
  logo: {
    position: 'absolute',
    left: '10%',
    top: '2%',
    backgroundColor: '#FF240E',
    color: 'white',
    textDecoration: 'none',
    zIndex: '99'
  },
  menu: {
    position: 'absolute',
    right: '10%',
    top: '2%',
    zIndex: '99'
  },
  menulist: {
    float: 'left',
    listStyleType: 'none'
  },
  menuItem: {
    color: colors.blue,
    fontFamily: 'Ubuntu, san-serif',
    fontSize: '1.3em',
    fontWeight: '700',    
    padding: theme.spacing(3),
    textDecoration: 'none',
    '&:hover': {
      color: colors.red
    }
  },
  menuActiveItem: {
    color: colors.red
  }
})

const Header = ({ classes, fullpageSection, isBlog, onSectionChange }) => {
  const onClickMenu = index => onSectionChange(index)
  
  return (
    <header>
      {
        fullpageSection > 0 && 
        <h1>
          <Link to="/" className={classes.logo}>bobae kang</Link>
        </h1>
      }
      
      <div className={classes.menu}>
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
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default withStyles(styles)(Header)
