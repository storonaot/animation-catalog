const defaultState = {
  loading: false,
  errors: null,
  data: null,
}

export default function episodes(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_EPISODES_ONLOAD':
      return { loading: true }
    case 'FETCH_EPISODES_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        errors: null
      }
    case 'FETCH_EPISODES_ERROR':
      return { loading: false, data: null, errors: action.payload }
    case 'CREATE_EPISODES_SUCCESS':
      return {
        loading: false,
        data: _.concat(state.data, action.payload),
        errors: null
      }
    case 'CREATE_EPISODES_ERROR':
      return { loading: false, data: null, errors: action.payload}
    default:
      return state
  }
}
