import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import colors from '../styles/colors'

const useStyles = makeStyles({
  back: {
    color: colors.darkgrey,
    fontSize: '16px',
    '&:hover': {
      color: colors.red,
      textDecoration: 'underline',
    },
  },
})

const LinkBackTo = ({ to: { name, path } }) => {
  const classes = useStyles()

  return (
    <Link className={classes.back} to={path}>
      ← {name}
    </Link>
  )
}

LinkBackTo.propTypes = {
  classes: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
}

export default LinkBackTo
