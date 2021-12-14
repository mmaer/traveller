import React from 'react'
import type { FC } from 'react'
import { Container, Text } from '@chakra-ui/react'

import type { CitiesResult } from '../../../../api/src/cities/types'

import { City } from '../City/City'

type CitiesListProps = Omit<CitiesResult, 'total'>

export const CitiesList: FC<CitiesListProps> = ({ cities }) => (
  <Container maxW="container.md">
    {cities.length === 0 ? (
      <Text fontSize="2xl" m="2">
        Cities not Found
      </Text>
    ) : (
      <div data-testid="cities-list">
        {cities.map(city => (
          <City key={city.id} {...city} />
        ))}
      </div>
    )}
  </Container>
)
