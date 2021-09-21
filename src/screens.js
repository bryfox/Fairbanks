import { Navigation } from 'react-native-navigation'

import Colors from './mixins/colors'
import Fairbanks from './containers/fairbanks'
import Extended from './presentation/forecast_view'
import Recreational from './presentation/forecast_view'

export default function () {
    Fairbanks.options = {
      topBar: {
        title: {
          text: 'Today’s Forecast'
        },
        background: {
            color: Colors.NavigationBackground
        }
      }
    }

    Navigation.registerComponent('Fairbanks', () => Fairbanks)
    Navigation.registerComponent('fairbanks.Extended', () => Extended)
    Navigation.registerComponent('fairbanks.Recreational', () => Recreational)
}
