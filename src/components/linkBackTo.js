import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const LinkBackTo = ({ to: { name, path } }) => {
  return (
    <Link
      className="text-darkgrey text-[16px] hover:text-red hover:underline"
      to={path}
    >
      ← {name}
    </Link>
  )
}

LinkBackTo.propTypes = {
  to: PropTypes.object.isRequired,
}

export default LinkBackTo
