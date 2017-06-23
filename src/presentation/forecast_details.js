import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
          scrollEnabled={false}
          renderItem={({item}) => <Text style={Styles.small}>{item.description}</Text> }
          renderSectionHeader={({section}) => <DateHeader title={section.title} style={Styles.small} />}
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
  small: {
    fontSize: 12,
    lineHeight: 16
  }
})

ForecastDetails.propTypes = {
// TODO: reuse
  details: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string, data: PropTypes.array})).isRequired,
}
