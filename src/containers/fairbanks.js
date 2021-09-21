/**
  Fairbanks main container.
  Controls API integration and provides data to view hierarchy.

  There are multiple forecast views in the app ("Today", "Extended", and "Recreational",
  each with more than one section), but all data is fetched from a single API request.
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  AppState,
  Button,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Navigation } from 'react-native-navigation'

import ApiProvider from '../mixins/api_provider'
import HomeView from '../presentation/home_view'

export default class Fairbanks extends Component {
  constructor(props) {
    super(props)
    this.apiProvider = new ApiProvider()
    this.state = this.state || EmptyState
    let callbacks = ['pushVC', 'pushExtended', 'pushRecreational', 'pushWeb', 'setForecastState', 'onAppStateChange']
    bindCallbacks(callbacks, this)
  }

  componentDidMount () {
    this.appStateListener = AppState.addEventListener('change', this.onAppStateChange)
    this.getData()
  }

  componentWillUnmount () {
    this.appStateListener.remove()
    this.apiProvider.cancel()
  }

  // Does not fire first time
  onAppStateChange (newState) {
    if (newState === AppStateActive) {
      this.getData()
    }
  }

  getData () {
    if (this.state.refreshing) { return }
    this.setState({refreshing: true})
    this.apiProvider.getDailyUpdate()
      .then(mapToForecasts)
      .then(this.setForecastState)
      .then(() => this.setState({refreshing: false}))
      .catch(err => {
        console.warn(err)
        this.setState(EmptyState)
      })
  }

  setForecastState([today, extended, recreational]) {
    this.setState(prevState => ({ forecast: { Today: today, Extended: extended, Recreational: recreational }}))
  }

  pushExtended () { this.pushVC("Extended") }
  pushRecreational () { this.pushVC("Recreational") }
  pushWeb () {
    Linking.openURL(this.state.forecast.Today.uri)
      .catch(err => console.error('An error occurred', err))
  }

  pushVC(type) {
    console.info("Push extended")
    Navigation.push(this.props.componentId,
      {
        component: {
          name: `fairbanks.${type}`,
          passProps: this.state.forecast[type],
          options: {
            topBar: {
              title: { text: `${type} Forecast` },
              backButtonTitle: 'Today'
            }
          }
        }
      }
    )
  }

  render() {
    return <HomeView
              isRefreshing={this.state.refreshing}
              didPressExtended={this.pushExtended}
              didPressRecreational={this.pushRecreational}
              didPressWeb={this.pushWeb}
              didRequestRefresh={this.getData.bind(this)}
              forecasts={this.state.forecast}
            />
  }
}

// https://facebook.github.io/react-native/docs/appstate.html
const AppStateActive = 'active'

const EmptyForecast = {
  details: []
}
const EmptyState = {
  refreshing: false,
  forecast: {
      Today: EmptyForecast,
      Extended: EmptyForecast,
      Recreational: EmptyForecast
    }
}

Fairbanks.propTypes = {
  componentId: PropTypes.string
}

/**
  A daily update consists of multiple forecasts: "today",
  "extended", and "recreational".
  @return Array of three forecasts
*/
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

/**
  Maps feed data (originally from HTML) to nested representation, formatted for consumption by a SectionList.
  Each section represents a time in the forecast (e.g., "extended" might have several days' worth).
  @see `ForecastDetailsShape` in mixins/prop_types.
  @return Array containing the details of a forecast
*/
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
