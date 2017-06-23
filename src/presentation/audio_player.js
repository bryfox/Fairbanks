import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  WebView,
  View
} from 'react-native'

import Header from '../presentation/header'

export default class AudioPlayer extends PureComponent {
  render () {
    if (!this.props.soundcloudId) { return null }
    return (
      <View style={{height: 40, paddingTop: 10, paddingBottom: 10 }}>
        <WebView
          source={{uri: iframeSrc(this.props.soundcloudId)}}
          onLoad={onLoad}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          onError={onError}
          scrollEnabled={false}
          scalesPageToFit={true}
        />
      </View>

    )
  }
}


const IOS_BLUE = '007aff'

function iframeSrc(soundcloudId) {
  if (soundcloudId) {
    return `https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F\
${soundcloudId}&show_artwork=false&show_comments=false&color=${IOS_BLUE}`
  }
}

AudioPlayer.propTypes = {
  soundcloudId: PropTypes.string
}

function onLoad() { console.log("onLoad") }
function onLoadEnd() { console.log("onLoadEnd") }
function onLoadStart() { console.log("onLoadStart") }
function onError() { console.log("onError") }
