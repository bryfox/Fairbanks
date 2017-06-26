import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import HomeView from '../src/presentation/home_view'

const EmptyForecast = {
  details: []
}
const EmptyState = {
  refreshing: false,
  forecast: {
      Today: EmptyForecast,
      Extended: EmptyForecast,
      Recreational: EmptyForecast
    }
}

describe('HomeView', () => {
  const noop = () => {}

  it('renders links to other screens', () => {
    const tree = renderer.create(
      <HomeView
          isRefreshing={false}
          didPressExtended={noop}
          didPressRecreational={noop}
          didPressWeb={noop}
          didRequestRefresh={noop}
          forecasts={EmptyState.forecast}
        />
    )
    expect(tree).toMatchSnapshot()
  })

})
