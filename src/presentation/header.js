import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPropTypes from '../mixins/prop_types'
import { View, Text } from 'react-native'

export default class Header extends Component {
  render () {
    return (
      <Text style={this.props.style}>{this.props.title}</Text>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  style: CustomPropTypes.StyleProp,
}
