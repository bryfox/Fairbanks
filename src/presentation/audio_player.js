import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  View,
  WebView,
} from 'react-native'

import Header from '../presentation/header'
import Colors from '../mixins/colors'

export default class AudioPlayer extends Component {
  constructor (props) {
    super(props)
    this.state = this.state || {}
  }

  onLoadStart () {
    this.setState({hasError: false})
  }

  onError (err) {
    console.error(err)
    this.setState({hasError: true})
  }

  render () {
    if (!this.props.soundcloudId || this.state.hasError) { return null }
    return (
      <View style={ViewStyle}>
        <WebView
          source={{uri: iframeSrc(this.props.soundcloudId)}}
          style={{"backgroundColor": "#ffffff00"}}
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

const UserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko)\
Chrome/58.0.3029.110 Safari/537.36 FairbanksClient/0.1"

// Soundcloud widget styling:
// - View height must be < 25 to get the compact styling
// - Android ReactWebView doesn't constrain height, but adding a border seems to fix
const Margins = { marginTop: 10, marginBottom: 10 }
const iOSStyle = { height: 20 }
const AndroidStyle = { height: 22, borderColor: '#ffffff00', borderStyle: 'solid', borderWidth: 1 }
const ViewStyle = Object.assign(Margins, Platform.select({ios: iOSStyle, android: AndroidStyle}))

function iframeSrc(soundcloudId) {
  if (soundcloudId) {
    return `https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F\
${soundcloudId}&show_artwork=false&show_comments=false&color=${Colors.NativeBlue.replace(/#/, '')}`
  }
}

AudioPlayer.propTypes = {
  soundcloudId: PropTypes.string
}
