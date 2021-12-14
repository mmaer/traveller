import React, { useState, useContext, useEffect } from 'react'
import type { FC, ChangeEvent } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack, Text } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

import { StateContext, fetchCities } from '../../reducer'

import { CitiesList } from '../CitiesList'

const MINIMUM_INPUT_LENGTH = 2

export const Home: FC = () => {
  const { state, asyncDispatch } = useContext(StateContext)
  const [cityName, setCityName] = useState('')

  useEffect(() => {
    if (cityName.length > MINIMUM_INPUT_LENGTH) {
      asyncDispatch(fetchCities({ queryParams: `name=${cityName}` }))
    }
  }, [cityName])

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const cityName = event.target.value
    setCityName(cityName)
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input onChange={onChangeInput} placeholder="Provide city name" />
          <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} />} />
        </InputGroup>
        {cityName.length > MINIMUM_INPUT_LENGTH ? (
          <CitiesList cities={state.cities} />
        ) : (
          <Text fontSize="2xl" m="2">
            The city must contain more than 2 characters
          </Text>
        )}
      </Container>
    </VStack>
  )
}
