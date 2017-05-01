const defaultState = {
  loading: false,
  errors: null,
  data: null,
}

export default function seasons(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_SEASONS_ONLOAD':
      return { loading: true }
    case 'FETCH_SEASONS_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        errors: null
      }
    case 'FETCH_SEASONS_ERROR':
      return { loading: false, data: null, errors: action.payload }
    case 'CREATE_SEASON_SUCCESS':
      return {
        loading: false,
        data: _.concat(state.data, action.payload),
        errors: null
      }
    case 'CREATE_SEASON_ERROR':
      return { loading: false, data: null, errors: action.payload}
    default:
      return state
  }
}
