const defaultState = {
  loading: false,
  errors: null,
  data: null,
}

export default function season(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_SEASON_ONLOAD':
      return { loading: true }
    case 'FETCH_SEASON_SUCCESS':
      // console.log('FETCH_SEASON_SUCCESS', action.payload);
      return { loading: false, data: action.payload, errors: null }
    case 'FETCH_SEASON_ERROR':
      return { loading: false, data: null, errors: action.payload }
    // case 'UPDATE_SEASON_ONLOAD':
    //   return { loading: true, data: state.data, errors: null }
    // case 'UPDATE_SEASON_SUCCESS':
    //   const newObj = _.assign(state.data, action.payload)
    //   return { loading: false, data: newObj, errors: null }
    // case 'UPDATE_SEASON_ERROR':
    //   return { loading: false, data: null, errors: action.payload }
    default:
      return state
  }
}
