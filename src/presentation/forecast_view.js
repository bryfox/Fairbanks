/**
  Forecast View displays the full forecast with audio player (if available).
  The first details section is treated as the primary forecast, and rendered separately.

  The `details[]` prop is required, but may be empty.
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Platform,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Fonts from '../mixins/fonts'
import CustomPropTypes from '../mixins/prop_types'
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

let headerStyle = {
  fontSize: 36,
}
let summaryStyle = {
  fontFamily: Fonts.Garamond,
  fontSize: 24,
}
if (Platform.OS === 'ios') {
  // Android renders with cropped text; padding doesn't correct. (React Native 0.45)
  headerStyle.lineHeight = 24
  headerStyle.paddingTop = 36 - 24
  summaryStyle.lineHeight = 26
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#ffffff00',
    margin: 10,
  },
  firstForecast: {
    marginBottom: 10,
    marginTop: 20,
  },
  header: headerStyle,
  summary: summaryStyle,
})

ForecastView.propTypes = {
  details: PropTypes.arrayOf(CustomPropTypes.ForecastDetailsProp).isRequired,
  soundcloudId: PropTypes.string
}
