import 'react-native'
import React from 'react'

import Fairbanks from '../src/containers/fairbanks'
import ApiProvider from '../src/mixins/api_provider'
import renderer from 'react-test-renderer'

// Load from __mocks__ subdir
jest.mock('../src/mixins/api_provider')

describe('the Fairbanks container', () => {
  it('requests new data after mounting', () => {
    let apiInstance = new ApiProvider()
    renderer.create(<Fairbanks navigator={{}} />)
    expect(apiInstance.getDailyUpdate).toHaveBeenCalled()
  })

})
