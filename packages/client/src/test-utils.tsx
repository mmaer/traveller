import * as React from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>{children}</BrowserRouter>
  </ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
