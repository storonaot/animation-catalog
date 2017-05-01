const defaultState = {
  loading: false,
  errors: null,
  data: null
}

export default function translators(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_TRANSLATORS_ONLOAD':
      return { loading: true }
    case 'FETCH_TRANSLATORS_SUCCESS':
      return { loading: false, data: action.payload, errors: null }
    case 'FETCH_TRANSLATORS_ERROR':
      return { loading: false, errors: action.payload }
    default:
      return state
  }
}
