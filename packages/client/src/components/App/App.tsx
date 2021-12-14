import React, { useReducer } from 'react'
import type { FC } from 'react'
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import { reducer, initialState, StateContext, asyncDispatch } from '../../reducer'

import { TopBar } from '../TopBar'
import { Home } from '../Home'
import { TravelList, types as ListTypes } from '../TravelList'

const fonts = {
  heading:
    '"Museo Sans", museo-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: '"Lato", lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  // chakra default
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

// Please take a look to README - Summarize section
export const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ChakraProvider theme={extendTheme({ fonts })}>
      <TopBar />
      <Box textAlign="center">
        <StateContext.Provider value={{ state, asyncDispatch: asyncDispatch(dispatch) }}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="wish-list" element={<TravelList type={ListTypes.WISHLIST} />} />
            <Route path="visited" element={<TravelList type={ListTypes.VISITED} />} />
          </Routes>
        </StateContext.Provider>
      </Box>
    </ChakraProvider>
  )
}
