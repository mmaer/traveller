import React from 'react'
import { screen } from '@testing-library/react'

import { StateContext, initialState } from '../../reducer'

import { render } from '../../test-utils'
import { TravelList, types } from './TravelList'

import { cities } from './__mocks__/cities.json'

describe('<TravelList /> component', () => {
  it('renders visited travel list', () => {
    const asyncDispatch = jest.fn()
    const state = {
      ...initialState,
      cities,
    }
    render(
      <StateContext.Provider value={{ state, asyncDispatch }}>
        <TravelList type={types.VISITED} />
      </StateContext.Provider>
    )
    const CitiesList = screen.getAllByTestId('city-component')
    expect(CitiesList).toHaveLength(2)
  })
})
