import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './header'
import Colors from '../mixins/colors'

export default class EmptyForecastView extends Component {
  render () {
    return (
      <View style={Styles.container}>
        <Header title="Forecast Unavailable" style={Styles.header} />
        <Text style={Styles.text}>Today’s forecast isn’t available yet.</Text>
        <Text style={Styles.text}>Check back later!</Text>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  header: {
    flex: 1,
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    flex: 1,
    textAlign: 'center',
  }
})
