import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  StyleSheet,
  Text,
  ScrollView,
  View,
  SectionList,
} from 'react-native'

import DateHeader from '../presentation/date_header'
import ForecastSection from '../presentation/forecast_section'
import ForecastDetails from '../presentation/forecast_details'
import AudioPlayer from '../presentation/audio_player'

export default class ForecastView extends Component {
  get summaryTitle () {
    return this.props.details[0] && this.props.details[0].title
  }

  get summaryText () {
    return this.props.details[0] && this.props.details[0].data[0].description
  }

  render () {
    return (
      <ScrollView contentContainerStyle={Styles.container}>
        <View style={Styles.firstForecast}>
          <SectionList
            scrollEnabled={false}
            renderItem={({item}) => <Text style={Styles.summary}>{item.description}</Text> }
            renderSectionHeader={({section}) => <DateHeader title={section.title} style={Styles.header} />}
            sections={this.props.details.slice(0,1)}
          />
        </View>
        <AudioPlayer soundcloudId={this.props.soundcloudId} />
        <ForecastDetails details={this.props.details.slice(1,-1)} />
      </ScrollView>
    )    
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    margin: 10,
  },
  firstForecast: {
    marginBottom: 10,
    marginTop: 20,
  },
  header: {
    fontSize: 36,
    lineHeight: 24,
    paddingTop: 36 - 24
  },
  summary: {
    fontFamily: 'EBGaramond',
    fontSize: 24,
    lineHeight: 26,
  },
})

ForecastView.propTypes = {
  details: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string, data: PropTypes.array})).isRequired,
  soundcloudId: PropTypes.string
}
