import React, { useContext } from 'react'
import type { FC, ChangeEvent } from 'react'
import { Stack, Checkbox, Box } from '@chakra-ui/react'

import type { City as CityType } from '../../../../api/src/cities/types'

import { StateContext, updateCity } from '../../reducer'

export const City: FC<CityType> = ({ id, name, country, visited, wishlist }) => {
  const { asyncDispatch } = useContext(StateContext)

  const onChange = (id: number) => async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target

    asyncDispatch(updateCity({ id, body: { [name]: checked } }))
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" m="6" data-testid="city-component">
      <Box mt="1" fontWeight="semibold" as="h2" lineHeight="tight" fontSize="3xl">
        City: {name}
      </Box>
      <Box mt="1" fontWeight="semibold" as="h3" lineHeight="tight" color="gray.500">
        Country: {country}
      </Box>
      <Stack spacing={10} direction="row" justify="center" mt="4">
        <Checkbox defaultChecked={visited} name="visited" onChange={onChange(id)} data-testid="checkbox-visited">
          Visited
        </Checkbox>
        <Checkbox defaultChecked={wishlist} name="wishlist" onChange={onChange(id)}>
          Wishlist
        </Checkbox>
      </Stack>
    </Box>
  )
}
