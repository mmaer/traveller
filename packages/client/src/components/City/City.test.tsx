import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { StateContext, initialState } from '../../reducer'

import { render } from '../../test-utils'
import { City } from './City'

import city from './__mocks__/city.json'

describe('<City /> component', () => {
  it('renders the cities list', () => {
    render(<City {...city} />)
    const CityName = screen.getByText(`City: ${city.name}`)
    const CityCountry = screen.getByText(`Country: ${city.country}`)

    expect(CityName).toBeInTheDocument()
    expect(CityCountry).toBeInTheDocument()
  })

  it('asyncDispatch func is called when visited checkbox is being clicked', () => {
    const asyncDispatch = jest.fn()

    render(
      <StateContext.Provider value={{ state: initialState, asyncDispatch }}>
        <City {...city} />
      </StateContext.Provider>
    )

    userEvent.click(screen.getByTestId('checkbox-visited'))

    expect(asyncDispatch.mock.calls.length).toBe(1)
  })
})
