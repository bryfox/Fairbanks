import { Navigation } from 'react-native-navigation'

import Colors from './mixins/colors'
import registerScreens from './screens'

export default function startApp () {
  registerScreens()

  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Fairbanks'
              }
            }
          ]
        }
      }
    })
  })
}
