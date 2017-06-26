import { Navigation } from 'react-native-navigation';

import registerScreens from './screens';

export default function startApp () {
  registerScreens()

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Fairbanks', // unique ID registered with Navigation.registerScreen; must match app name
      title: 'Today’s Forecast',
      navigatorStyle: {}
    }
  });
}
