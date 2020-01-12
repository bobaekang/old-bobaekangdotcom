import React from 'react'
import { Link } from 'gatsby'

// material ui
import { withStyles } from '@material-ui/core/styles'

// styles
import colors from '../styles/colors'

const styles = {
  back: {
    color: colors.darkgrey,
    fontSize: '16px',
    '&:hover': {
      color: colors.red,
      textDecoration: 'underline',
    },
  },
}

const linkBackTo = ({ classes, to: { name, path } }) => (
  <Link className={classes.back} to={path}>
    ← {name}
  </Link>
)

export default withStyles(styles)(linkBackTo)
