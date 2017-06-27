/**
  Color constants as CSS hex (with leading hash).
  Example: '#ccc'
*/

import { Platform } from 'react-native'

// https://material.google.com/style/color.html#color-color-palette
// https://stackoverflow.com/questions/19032940/how-can-i-get-the-ios-7-default-blue-color-programmatically#19033293

const IOS_BLUE = '#007aff'
const ANDROID_BLUE = '#2196f3'

const IOS_NAV_BG = '#f8f8f8'
const ANDROID_NAV_BG = '#fff'

export default {
  NativeBlue: Platform.select({ios: IOS_BLUE, android: ANDROID_BLUE}),
  NavigationBackground: Platform.select({ios: IOS_NAV_BG, android: ANDROID_NAV_BG}),
  DateHeader: '#ccc',
  Header: '#666'
}
