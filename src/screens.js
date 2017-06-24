import { Navigation } from 'react-native-navigation'
import Fairbanks from './containers/fairbanks'
import Extended from './presentation/forecast_view'
import Recreational from './presentation/forecast_view'

export default function () {
    Navigation.registerComponent('Fairbanks', () => Fairbanks)
    Navigation.registerComponent('fairbanks.Extended', () => Extended)
    Navigation.registerComponent('fairbanks.Recreational', () => Recreational)
}
