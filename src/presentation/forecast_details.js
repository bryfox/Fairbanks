import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPropTypes from '../mixins/prop_types'
import {
  StyleSheet,
  Text,
  View,
  SectionList
} from 'react-native'

import DateHeader from '../presentation/date_header'

export default class ForecastDetails extends Component {
  render () {
    console.log(this.props.details)
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

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontFamily: 'EBGaramond',
    fontSize: 20,
    lineHeight: 22,
    marginBottom: 8,
  },
  header: {
    fontSize: 16,
    lineHeight: 16,
    marginBottom: 4,
    paddingTop: 8, // not marginTop; would reveal BG when scrolling
  }
})

ForecastDetails.propTypes = {
  details: CustomPropTypes.forecastDetailsProp,
}
