import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Touchable,
  TouchableOpacity,
  TouchableNativeFeedback,
  Button,
  StyleSheet,
  Platform,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'
import Colors from '../mixins/colors'
import ColorPropType from 'ColorPropType'

export default class ImageButton extends Button {
  render () {
    const Padding = 8

    const {
      accessibilityLabel,
      onPress,
      image,
      disabled,
      size
    } = this.props

    let iconColor = Platform.select({
      ios: disabled ? '#dfdfdf' : Colors.NativeBlue,
      android: "#fff"
    })

    const buttonStyles = [styles.button, {
      padding: Padding
    }]
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    if (disabled) {
      buttonStyles.push(styles.buttonDisabled)
    }

    const accessibilityTraits = ['button']
    if (disabled) {
      accessibilityTraits.push('disabled')
    }

    return (
      <Touchable
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        disabled={disabled}
        onPress={onPress}>
        <View style={buttonStyles}>
          <Icon name={image} size={size - Padding * 2} color={iconColor} />
        </View>
      </Touchable>
    )
  }

}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: Colors.NativeBlue,
      borderRadius: 2,
    },
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    }
  })
})

ImageButton.propTypes = {
    size: PropTypes.number.isRequired,
    /**
     * Name of the image
     */
    image: PropTypes.string.isRequired,
    accessibilityLabel: PropTypes.string,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
}
