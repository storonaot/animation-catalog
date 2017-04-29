const defaultState = {
  loading: null,
  errors: null,
  data: null
}

export default function serials(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_COUNTRIES_ONLOAD':
      return { loading: true }
    case 'FETCH_COUNTRIES_SUCCESS':
      return { loading: false, data: action.payload, errors: null }
    case 'FETCH_COUNTRIES_ERROR':
      return { loading: false, data: null, errors: action.payload }
    default:
      return state
  }
}
