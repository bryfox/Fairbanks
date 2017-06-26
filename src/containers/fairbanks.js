/**
 * Fairbanks main screen
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  AppState,
  Button,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import ForecastView from '../presentation/forecast_view'
import ImageButton from '../presentation/image_button'

export default class Fairbanks extends Component {
  constructor(props) {
    super(props)
    let callbacks = ['pushVC', 'pushExtended', 'pushRecreational', 'pushWeb', 'setForecastState', 'onAppStateChange']
    bindCallbacks(callbacks, this)
    this.state = this.state || EmptyState
  }

  componentDidMount () {
    AppState.addEventListener('change', this.onAppStateChange);
    this.getData()
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.onAppStateChange);
  }

  // Does not fire first time
  onAppStateChange (newState) {
    if (newState == AppStateActive) {
      this.getData()
    }
  }

  // TODO: cancel xhr
  // componentWillUnmount

  getData () {
    console.log('Fetching latest data from', ApiUrl)
    headers = { 'Content-Type': 'application/json' }
    fetch(ApiUrl, {})
      .then(resp => resp.json())
      .then(json => json.data)
      .then(data => data[data.length - 1])
      .then(mapToForecasts)
      .then(this.setForecastState)
      .then(() => console.info("set state complete"))
      .catch(console.error)
  }

  setForecastState([today, extended, recreational]) {
    this.setState(prevState => ({ forecast: { Today: today, Extended: extended, Recreational: recreational }}))
  }

  pushExtended () { this.pushVC(Extended) }
  pushRecreational () { this.pushVC(Recreational) }
  pushWeb () {
    Linking.openURL(this.state.forecast.Today.uri)
      .catch(err => console.error('An error occurred', err));
  }

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
        <ScrollView>
          <ForecastView
                        details={this.state.forecast.Today.details}
                        soundcloudId={this.state.forecast.Today.soundcloudId}
          />
        </ScrollView>
        <View style={Styles.buttonContainer}>
          <Button
            style={Styles.button}
            onPress={this.pushExtended}
            title="Extended"
            accessibilityLabel="Extended Forecast"
            disabled={this.state.forecast.Extended.details.length == 0}
          />
          <Button
            style={Styles.button}
            onPress={this.pushRecreational}
            title="Recreational"
            accessibilityLabel="Recreational Forecast"
            disabled={this.state.forecast.Recreational.details.length == 0}
          />
          <ImageButton
            style={Styles.button}
            onPress={this.pushWeb}
            image="export"
            size={ButtonHeight}
            accessibilityLabel="Web Version"
            disabled={!this.state.forecast.Today.uri}
          />
        </View>
      </View>
    )
  }
}

const ApiUrl = 'http://freyja.local:8888/api/v1/forecasts'

// https://facebook.github.io/react-native/docs/appstate.html
const AppStateActive = 'active'

const Extended = "Extended"
const Recreational = "Recreational"

const EmptyForecast = {
  details: []
}
const EmptyState = {
  forecast: {
      Today: EmptyForecast,
      Extended: EmptyForecast,
      Recreational: EmptyForecast
    }
}

const ButtonHeight = 24 + 8 + 8

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: ButtonHeight,
    justifyContent: 'space-between',
  },
  button: {
  }
})

Fairbanks.propTypes = {
  navigator: PropTypes.object.isRequired
}

function mapToForecasts(apiResponse) {
  if (apiResponse) {
    return [
      mapToTodaysForecast(apiResponse),
      mapToExtendedForecast(apiResponse),
      mapToRecreationalForecast(apiResponse)    
    ]
  } else {
    return [EmptyForecast, EmptyForecast, EmptyForecast]
  }
}

function mapToTodaysForecast(apiResponse) {
    return {
      details: apiResponse.detailed_summary ? mapForecastToSections(apiResponse.detailed_summary.node) : [],
      soundcloudId: apiResponse.soundcloud_id,
      uri: apiResponse.uri
    }
}

function mapToExtendedForecast(apiResponse) {
    return {
      details: apiResponse.extended_summary ? mapForecastToSections(apiResponse.extended_summary.node) : []
    }
}

function mapToRecreationalForecast(apiResponse) {
    return {
      details: apiResponse.recreational_summary ? mapForecastToSections(apiResponse.recreational_summary.node) : []
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

function bindCallbacks (callbacks, self) {
  callbacks.forEach(name => self[name] = self[name].bind(self))
}
