import React from 'react'
import { screen } from '@testing-library/react'

import { render } from '../../test-utils'
import { CitiesList } from './CitiesList'

import { cities } from './__mocks__/cities.json'

describe('<CitiesList /> component', () => {
  it('renders the cities list', () => {
    render(<CitiesList cities={cities} />)
    const Cities = screen.getByTestId('cities-list')
    expect(Cities).toBeInTheDocument()
  })

  it('renders "Cities not Found" when list is empty', () => {
    render(<CitiesList cities={[]} />)
    const CityNotFound = screen.getByText(/^Cities not Found$/i)
    expect(CityNotFound).toBeInTheDocument()
  })
})
