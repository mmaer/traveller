import React, { useContext, useEffect } from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'

import { StateContext, fetchCities } from '../../reducer'

import type { City } from '../../../../api/src/cities/types'

import { CitiesList } from '../CitiesList'

enum TYPES {
  WISHLIST,
  VISITED,
}

const LIST_TYPES = {
  [TYPES.WISHLIST]: {
    title: 'Wish list',
    queryParams: 'wishlist=true',
    filter: ({ wishlist }: City) => wishlist,
  },
  [TYPES.VISITED]: {
    title: 'Visited',
    queryParams: 'visited=true',
    filter: ({ visited }: City) => visited,
  },
}

const TravelList: FC<{ type: TYPES }> = ({ type }) => {
  const { state, asyncDispatch } = useContext(StateContext)
  const { title, queryParams, filter } = LIST_TYPES[type]

  useEffect(() => {
    asyncDispatch(fetchCities({ queryParams }))
  }, [type])

  const citiesList = state.cities.filter(filter)

  return (
    <>
      <Heading as="h1">{title}</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        <CitiesList cities={citiesList} />
      </Container>
    </>
  )
}

const types = TYPES

export { TravelList, types }
