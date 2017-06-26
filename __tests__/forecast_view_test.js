import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import './helpers/custom_expectations'

import ForecastView from '../src/presentation/forecast_view'

const EmptyForecast = {
  details: []
}

describe('ForecastView', () => {
  const noop = () => {}


  describe('without data', () => {
    it('handles the empty state', () => {
      const tree = renderer.create(<ForecastView details={EmptyForecast.details} />)
      expect(tree).toContainSectionList()
      expect(tree).not.toContainSectionListWithData()
    })
  })

  describe('with data', () => {
    const detail = {
      title: "June 26",
      data: [
        { description: "Sunny and warm", key: 2 }
      ],
      key: 1
    }

    const forecast = Object.assign({}, EmptyForecast, {details: [detail]})

    it('renders forecast sections', () => {
      const tree = renderer.create(
        <ForecastView details={forecast.details} />
      )

      expect(tree).toContainSectionListWithData()
    })
  })

})
