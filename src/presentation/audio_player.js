import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Linking,
  Platform,
  View,
} from 'react-native'
import { WebView } from 'react-native-webview'

import Header from '../presentation/header'
import Colors from '../mixins/colors'

export default class AudioPlayer extends Component {
  constructor (props) {
    super(props)
    this.state = this.state || { viewStyle: ViewStyle }
  }

  onLoadStart () {
    this.setState({hasError: false})
  }

  onError (err) {
    console.error(err)
    this.setState({hasError: true})
  }

  onNavigationStateChange (evt) {
    const ExpandedHeight = 200
    if (Platform.OS !== 'android') { return }
    if (!AllowableUrlPattern.test(evt.url)) {
      // This is not a playback widget; see Widget note below
      this.setState(prev => ({ viewStyle: Object.assign({}, prev.viewStyle, { height: ExpandedHeight }) }))
    }
  }

  render () {
    if (!this.props.soundcloudId || this.state.hasError) { return null }
    return (
      <View style={this.state.viewStyle}>
        <WebView
          source={{uri: iframeSrc(this.props.soundcloudId)}}
          style={{"backgroundColor": "#ffffff00"}}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onLoadStart={this.onLoadStart.bind(this)}
          onError={this.onError.bind(this)}
          scrollEnabled={false}
          scalesPageToFit={true}
          userAgent={UserAgent}
        />
      </View>
    )
  }
}

AudioPlayer.propTypes = {
  soundcloudId: PropTypes.string
}

const UserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko)\
Chrome/58.0.3029.110 Safari/537.36 FairbanksClient/0.1"

// Soundcloud widget styling:
// - View height must be < 25 to get the compact styling
// - Android ReactWebView doesn't constrain height, but adding a border seems to fix
const Margins = { marginTop: 10, marginBottom: 10 }
const iOSStyle = { height: 20 }
const AndroidStyle = { height: 22, borderColor: '#ffffff00', borderStyle: 'solid', borderWidth: 1 }
const ViewStyle = Object.assign(Margins, Platform.select({ios: iOSStyle, android: AndroidStyle}))

// Widget includes a link to the soundcloud site/app,
// which will error on iOS if displayed natively.
// Only allow playback URLs; redirect anything else to an external browser.
// NOTE for Android: React Native (as of 0.45) doesn't provide a hook to `shouldOverrideUrlLoading()`,
// so we're out of luck here. Instead, we change the height in onNavigationStateChange().
const AllowableUrlPattern = new RegExp('^https://w.soundcloud.com')
function onShouldStartLoadWithRequest (evt) {
  if (Platform.OS === 'android') { return }
  let isPlaybackUrl = AllowableUrlPattern.test(evt.url)
  if (!isPlaybackUrl) {
      Linking.openURL(evt.url)
        .catch(err => console.error('An error occurred with evt.url', err))
  }
  return isPlaybackUrl
}


function iframeSrc(soundcloudId) {
  if (soundcloudId) {
    return `https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F\
${soundcloudId}&show_artwork=false&show_comments=false&color=${Colors.NativeBlue.replace(/#/, '')}`
  }
}
