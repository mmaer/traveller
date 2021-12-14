import { ReducerActionType, reducer, initialState } from './reducer'

const CITIES_MOCK = {
  cities: [
    {
      id: 0,
      name: 'Moscow',
      country: 'Russia',
      visited: false,
      wishlist: false,
    },
    {
      id: 1,
      name: 'London',
      country: 'United Kingdom',
      visited: false,
      wishlist: false,
    },
    {
      id: 2,
      name: 'Saint Petersburg',
      country: 'Russia',
      visited: false,
      wishlist: false,
    },
  ],
  total: 3,
}

describe('Reducer test', () => {
  it(`handles ${ReducerActionType[ReducerActionType.FETCH_CITIES_REQUEST]} action`, () => {
    const state = reducer(initialState, { type: ReducerActionType.FETCH_CITIES_REQUEST })

    expect(state).toEqual({ ...initialState, loading: true })
  })

  it(`handles ${ReducerActionType[ReducerActionType.FETCH_CITIES_SUCCESS]} action`, () => {
    const state = reducer(initialState, { type: ReducerActionType.FETCH_CITIES_SUCCESS, payload: CITIES_MOCK })

    expect(state).toEqual({ ...initialState, ...CITIES_MOCK })
  })

  it(`handles ${ReducerActionType[ReducerActionType.FETCH_CITIES_FAILURE]} action`, () => {
    const state = reducer(initialState, { type: ReducerActionType.FETCH_CITIES_FAILURE })

    expect(state).toEqual({ ...initialState, error: new Error('Could not fetch cities') })
  })

  it(`handles ${ReducerActionType[ReducerActionType.UPDATE_CITY_REQUEST]} action`, () => {
    const state = reducer(initialState, { type: ReducerActionType.UPDATE_CITY_REQUEST })

    expect(state).toEqual({ ...initialState, loading: true })
  })

  it(`handles ${ReducerActionType[ReducerActionType.UPDATE_CITY_SUCCESS]} action`, () => {
    const payload = { ...CITIES_MOCK.cities[1], visited: true }
    const state = reducer({ ...initialState, ...CITIES_MOCK }, { type: ReducerActionType.UPDATE_CITY_SUCCESS, payload })
    const cities = [CITIES_MOCK.cities[0], payload, CITIES_MOCK.cities[2]]

    expect(state).toEqual({ ...initialState, ...CITIES_MOCK, cities })
  })

  it(`handles ${ReducerActionType[ReducerActionType.UPDATE_CITY_FAILURE]} action`, () => {
    const state = reducer(initialState, { type: ReducerActionType.UPDATE_CITY_FAILURE })

    expect(state).toEqual({ ...initialState, error: new Error('Could not update city') })
  })
})
