import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'

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

linkBackTo.propTypes = {
  classes: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
}

export default withStyles(styles)(linkBackTo)
