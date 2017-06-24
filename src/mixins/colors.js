import { Platform } from 'react-native'

// https://material.google.com/style/color.html#color-color-palette
// https://stackoverflow.com/questions/19032940/how-can-i-get-the-ios-7-default-blue-color-programmatically#19033293

const IOS_BLUE = '007aff'
const ANDROID_BLUE = '2196f3'

export default {
  nativeBlue: Platform.select({ios: IOS_BLUE, android: ANDROID_BLUE})
}
