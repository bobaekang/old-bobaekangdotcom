import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import colors from '../styles/colors.js'

const useStyles = makeStyles({
  sectionContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-between',
  },
  sectionTitle: {
    fontSize: '5rem',
    lineHeight: '.8em',
    color: colors.red,
  },
  sectionSubtitle: {
    fontSize: '1.25em',
    color: colors.darkgrey,
  },
})

const SectionHome = () => {
  const classes = useStyles()

  return (
    <Container className={classes.sectionContainer} maxWidth="md">
      <div className={classes.sectionMain}>
        <h1 className={classes.sectionTitle}>bobae kang</h1>
        <p className={classes.sectionSubtitle}>
          social scientist turned software engineer
        </p>
      </div>
    </Container>
  )
}

export default SectionHome
