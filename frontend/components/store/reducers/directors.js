const defaultState = {
  loading: false,
  errors: null,
  data: null
}

export default function serials(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_DIRECTORS_ONLOAD':
      return { loading: true }
    case 'FETCH_DIRECTORS_SUCCESS':
      return { loading: false, data: action.payload, errors: null }
    case 'FETCH_DIRECTORS_ERROR':
      return { loading: false, errors: action.payload }
    default:
      return state
  }
}
