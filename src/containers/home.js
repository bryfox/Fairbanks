/**
 * Fairbanks main screen
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Button
} from 'react-native'

import ForecastView from '../presentation/forecast_view'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.pushVC = this.pushVC.bind(this)
    this.pushExtended = this.pushExtended.bind(this)
    this.pushRecreational = this.pushRecreational.bind(this)
    this.state = this.state || EmptyState
    this.getData()
  }

  getData () {
    if (this.state.forecastData) {
      return
    }
    headers = { 'Content-Type': 'application/json' }
    fetch("http://freyja.local:8888/api/v1/forecasts", {})
      .then(resp => resp.json())
      .then(json => json.data)
      .then(data => data[data.length - 1])
      .then(mapToForecasts)
      .then(this.setForecastState.bind(this))
      .catch(console.error)
  }

  setForecastState([today, extended, recreational]) {
    this.setState(prevState => ({ forecast: { Today: today, Extended: extended, Recreational: recreational }}))
  }

  pushExtended () { this.pushVC(Extended) }
  pushRecreational () { this.pushVC(Recreational) }

  pushVC(type) {
    this.props.navigator.push({
      screen: `fairbanks.${type}`,
      title: `${type} Forecast`,
      passProps: this.state.forecast[type],
      backButtonTitle: 'Today'
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ForecastView details={this.state.forecast.Today.details}
                      soundcloudId={this.state.forecast.Today.soundcloudId}
        />
        <View style={Styles.buttonContainer}>
          <Button
            style={Styles.button}
            onPress={this.pushExtended}
            title="Extended"
            accessibilityLabel="Extended Forecast"
          />
          <Button
            style={Styles.button}
            onPress={this.pushRecreational}
            title="Recreational"
            accessibilityLabel="Recreational Forecast"
          />
        </View>
      </View>
    )
  }
}

const Extended = "Extended"
const Recreational = "Recreational"

const EmptyState = {
  forecast: {
      Today: { details: [] },
      Extended: { details: [] },
      Recreational: { details: [] }
    }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 24 + 8 + 8,
    justifyContent: 'space-between',
  },
  button: {
  }
})

Home.propTypes = {
  navigator: PropTypes.object.isRequired
}

function mapToForecasts(apiResponse) {
  return [
    mapToTodaysForecast(apiResponse),
    mapToExtendedForecast(apiResponse),
    mapToRecreationalForecast(apiResponse)    
  ]
}

function mapToTodaysForecast(apiResponse) {
    return {
      details: mapForecastToSections(apiResponse.detailed_summary.node),
      soundcloudId: apiResponse.soundcloud_id
    }
}

function mapToExtendedForecast(apiResponse) {
    return {
      details: mapForecastToSections(apiResponse.extended_summary.node)
    }
}

function mapToRecreationalForecast(apiResponse) {
    return {
      details: mapForecastToSections(apiResponse.recreational_summary.node)
    }
}

function mapForecastToSections(nodeItems) {
  // nodeItems are sent as a list of tags (h3, then p)
  // h2 should be ignored for this UI
  let sections = []
  nodeItems.forEach((item, index) => {
    switch(item.tag) {
      case 'h3': // new section
        sections.push({title: item.content, data: [], key: index})
        break
      case 'p': // content for the current section
        sections[sections.length - 1].data.push({description: item.content, key: index})
        break
    }
  })
  return sections
}
