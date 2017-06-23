import { Navigation } from 'react-native-navigation'
import Home from './containers/home'
import Extended from './presentation/forecast_view'
import Recreational from './presentation/forecast_view'

export default function () {
    Navigation.registerComponent('fairbanks.Home', () => Home)
    Navigation.registerComponent('fairbanks.Extended', () => Extended)
    Navigation.registerComponent('fairbanks.Recreational', () => Recreational)
}
