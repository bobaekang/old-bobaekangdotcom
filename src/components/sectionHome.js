import React from 'react'
import Container from '@material-ui/core/Container'

const SectionHome = () => {
  return (
    <Container
      className="flex flex-col justify-center content-between"
      maxWidth="md"
    >
      <h1 className="text-[5rem] leading-[0.8em] text-red">bobae kang</h1>
      <p className="text-[1.25em] text-darkgrey">
        social scientist turned software engineer
      </p>
    </Container>
  )
}

export default SectionHome
