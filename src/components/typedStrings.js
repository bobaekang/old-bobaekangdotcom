import React from 'react'
import Typed from 'typed.js'

class TypedStrings extends React.Component {
  componentDidMount() {
    this.typed = new Typed(this.el, {
      strings: this.props.strings,
      typeSpeed: 50,
      backSpeed: 50,
    })
  }

  componentWillUnmount() {
    this.typed.destroy()
  }

  render() {
    return <span ref={el => (this.el = el)} />
  }
}

export default TypedStrings
