const defaultState = {
  loading: false,
  errors: null,
  data: null
}

export default function voiceovers(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_VOICEOVERS_ONLOAD':
      return { loading: true }
    case 'FETCH_VOICEOVERS_SUCCESS':
      return { loading: false, data: action.payload, errors: null }
    case 'FETCH_VOICEOVERS_ERROR':
      return { loading: false, errors: action.payload }
    default:
      return state
  }
}
