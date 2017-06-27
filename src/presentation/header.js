import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import CustomPropTypes from '../mixins/prop_types'
import Colors from '../mixins/colors'

export default class Header extends Component {
  render () {
    return (
      <Text style={[{color: Colors.Header}, this.props.style]}>{this.props.title}</Text>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  style: CustomPropTypes.StyleProp,
}
