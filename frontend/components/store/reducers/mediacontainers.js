const defaultState = {
  loading: false,
  errors: null,
  data: null
}

export default function mediacontainers(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_MEDIACONTAINERS_ONLOAD':
      return { loading: true }
    case 'FETCH_MEDIACONTAINERS_SUCCESS':
      return { loading: false, data: action.payload, errors: null }
    case 'FETCH_MEDIACONTAINERS_ERROR':
      return { loading: false, errors: action.payload }
    default:
      return state
  }
}
