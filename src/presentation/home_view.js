import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,

  Text
} from 'react-native'

import ForecastView from '../presentation/forecast_view'
import EmptyForecastView from '../presentation/empty_forecast_view'
import ImageButton from '../presentation/image_button'
import CustomPropTypes from '../mixins/prop_types'

export default class HomeView extends Component {
  get hasNoData () {
    return !this.props.isRefreshing && !Object.values(this.props.forecasts).some(f => f.details.length )
  }

  get forecastView () {
    return <ForecastView details={this.props.forecasts.Today.details}
            soundcloudId={this.props.forecasts.Today.soundcloudId} />
  }

  render () {
    let refresh = <RefreshControl refreshing={this.props.isRefreshing} onRefresh={this.props.didRequestRefresh}/>
    let { forecasts, didPressExtended, didPressRecreational, didPressWeb } = this.props

    return (
      <View style={{flex:1}}>
        <ScrollView refreshControl={refresh}>
          {this.hasNoData ? <EmptyForecastView /> : this.forecastView}
        </ScrollView>
        <View style={Styles.buttonContainer}>
          <Button
            style={Styles.button}
            onPress={didPressExtended}
            title="Extended"
            accessibilityLabel="Extended Forecast"
            disabled={forecasts.Extended.details.length === 0}
          />
          <Button
            style={Styles.button}
            onPress={didPressRecreational}
            title="Recreational"
            accessibilityLabel="Recreational Forecast"
            disabled={forecasts.Recreational.details.length === 0}
          />
          <ImageButton
            style={Styles.button}
            onPress={didPressWeb}
            image="export"
            size={ButtonHeight}
            accessibilityLabel="Web Version"
            disabled={!forecasts.Today.uri}
          />
        </View>
      </View>
    )
  }
}

const ForecastShape = CustomPropTypes.ForecastProp

HomeView.propTypes = {
  isRefreshing: PropTypes.bool.isRequired,
  didPressExtended: PropTypes.func.isRequired,
  didPressRecreational: PropTypes.func.isRequired,
  didPressWeb: PropTypes.func.isRequired,
  didRequestRefresh: PropTypes.func.isRequired,
  forecasts: PropTypes.shape({
    Today: ForecastShape.isRequired,
    Extended: ForecastShape.isRequired,
    Recreational: ForecastShape.isRequired,
  }).isRequired
}

const ButtonHeight = 24 + 8 + 8

const Styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    height: ButtonHeight,
    justifyContent: 'space-between',
  },
  button: {
  }
})
