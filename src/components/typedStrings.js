import React from 'react'
import PropTypes from 'prop-types'
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
    return (
      <div className={this.props.className}>
        <span ref={el => (this.el = el)} />
      </div>
    )
  }
}

TypedStrings.propTypes = {
  className: PropTypes.string,
}

export default TypedStrings
