import { createContext } from 'react'

import type { City, CitiesResult } from '../../api/src/cities/types'

import { apiHost } from './config'

export type State = {
  cities: City[]
  total: number
  error?: Error
  loading?: boolean
}

type Action = {
  type: ReducerActionType
  payload?: City | CitiesResult | Error
}

type AsyncActions = {
  request: ReducerActionType
  success: ReducerActionType
  failure: ReducerActionType
}

type Request = {
  url: string
  options?: RequestInit
}

type AsyncDispatch = {
  actions: AsyncActions
  request: Request
}

type ContextProps = {
  state: State
  asyncDispatch: ({ actions, request }: AsyncDispatch) => void
}

export const StateContext = createContext({} as ContextProps)

export const initialState: State = {
  cities: [],
  total: 0,
  error: undefined,
  loading: false,
}

export enum ReducerActionType {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  UPDATE_CITY_REQUEST,
  UPDATE_CITY_SUCCESS,
  UPDATE_CITY_FAILURE,
}

export const fetchCities = ({ queryParams }: { queryParams: string }): AsyncDispatch => ({
  actions: {
    request: ReducerActionType.FETCH_CITIES_REQUEST,
    success: ReducerActionType.FETCH_CITIES_SUCCESS,
    failure: ReducerActionType.FETCH_CITIES_FAILURE,
  },
  request: {
    url: `${apiHost}/rest/cities?${queryParams}`,
  },
})

export const updateCity = <Tbody>({ id, body }: { id: number; body: Tbody }): AsyncDispatch => ({
  actions: {
    request: ReducerActionType.UPDATE_CITY_REQUEST,
    success: ReducerActionType.UPDATE_CITY_SUCCESS,
    failure: ReducerActionType.UPDATE_CITY_FAILURE,
  },
  request: {
    url: `${apiHost}/rest/cities/${id}`,
    options: {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  },
})

export const asyncDispatch =
  (dispatch: (action: Action) => void) =>
  async ({ actions, request }: AsyncDispatch) => {
    dispatch({ type: actions.request })

    try {
      const response = await fetch(request.url, request.options)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()

      dispatch({ type: actions.success, payload: data })
    } catch (error) {
      dispatch({ type: actions.failure, payload: error as Error })
    }
  }

export function reducer(state: State = initialState, action: Action): State {
  const { type, payload } = action

  switch (type) {
    case ReducerActionType.FETCH_CITIES_REQUEST:
      return { ...state, loading: true }
    case ReducerActionType.FETCH_CITIES_SUCCESS:
      return { ...state, ...payload, loading: false }
    case ReducerActionType.FETCH_CITIES_FAILURE:
      return { ...state, loading: false, error: new Error('Could not fetch cities') }
    case ReducerActionType.UPDATE_CITY_REQUEST:
      return { ...state, loading: true }
    case ReducerActionType.UPDATE_CITY_SUCCESS:
      return {
        ...state,
        // Workaround
        cities: state.cities.map((city): City => (city.id === (payload as City).id ? (payload as City) : city)),
        loading: false,
      }
    case ReducerActionType.UPDATE_CITY_FAILURE:
      return { ...state, loading: false, error: new Error('Could not update city') }
    default:
      throw initialState
  }
}
