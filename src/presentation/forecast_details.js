/**
  Details are rendered in a section list. Forecasts typically include a series of sections
  each comprised of a date header + text content.
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPropTypes from '../mixins/prop_types'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SectionList
} from 'react-native'

import Fonts from '../mixins/fonts'
import DateHeader from '../presentation/date_header'

export default class ForecastDetails extends Component {
  render () {
    return (
      <View style={Styles.container}>
        <SectionList
          scrollEnabled={true}
          renderItem={({item}) => <Text style={[Styles.description, Styles.small]}>{item.description}</Text> }
          renderSectionHeader={({section}) => <DateHeader title={section.title} style={Styles.header} />}
          sections={this.props.details}
        />
      </View>
    )
  }
}

let headerStyle = {
  fontSize: 16,
  marginBottom: 4,
  paddingTop: 8, // not marginTop; would reveal BG when scrolling
}
let descriptionStyle = {
    fontFamily: Fonts.Garamond,
    fontSize: 20,
    marginBottom: 8,
    paddingBottom: 8,
}
if (Platform.OS === 'ios') {
  // Android renders with cropped text; padding doesn't correct. (React Native 0.45)
  headerStyle.lineHeight = 16
  descriptionStyle.lineHeight = 22
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff00',
    flex: 1,
    justifyContent: 'center',
  },
  description: descriptionStyle,
  header: headerStyle
})

ForecastDetails.propTypes = {
  details: PropTypes.arrayOf(CustomPropTypes.ForecastDetailsProp)
}
