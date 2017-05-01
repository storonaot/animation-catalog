const defaultState = {
  loading: false,
  errors: null,
  data: null
}

export default function videoformats(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_VIDEOFORMATS_ONLOAD':
      return { loading: true }
    case 'FETCH_VIDEOFORMATS_SUCCESS':
      return { loading: false, data: action.payload, errors: null }
    case 'FETCH_VIDEOFORMATS_ERROR':
      return { loading: false, errors: action.payload }
    default:
      return state
  }
}
