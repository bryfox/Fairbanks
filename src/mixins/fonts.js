/**
  Normalize differences in font naming requirements between platforms
*/

import { Platform } from 'react-native'

const Lobster = Platform.select({ios: 'Lobster', android: 'Lobster-Regular'})
const Garamond = Platform.select({ios: 'EBGaramond', android: 'EBGaramond-Regular'})

export default {
  Lobster: Lobster,
  Garamond: Garamond,
  DateHeader: Lobster,
}
