import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import TypedStrings from '../components/typedStrings'
import colors from '../styles/colors.js'

const useStyles = makeStyles({
  sectionContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-between',
  },
  sectionMain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '34%',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 'calc(2em + 6vw)',
    color: colors.red,
    marginBottom: '0.2rem',
  },
  stripe: {
    backgroundColor: colors.lightblue,
    height: '16.5%',
    width: '100%',
  },
  typedString: {
    fontSize: '1.2em',
    color: colors.darkgrey,
  },
})

const SectionHome = () => {
  const classes = useStyles()

  return (
    <Container className={classes.sectionContainer} maxWidth="md">
      <div className={classes.stripe} />
      <div className={classes.sectionMain}>
        <h1 className={classes.sectionTitle}>bobae kang</h1>
        <div className={classes.typedString}>
          <TypedStrings
            strings={[
              'Chicago-based social scientist turned software engineer',
            ]}
          />
        </div>
      </div>
      <div className={classes.stripe} />
    </Container>
  )
}

export default SectionHome
