const defaultState = {
  loading: false,
  errors: null,
  data: null,
}

export default function serials(state = defaultState, action) {

  switch (action.type) {
    case 'FETCH_SERIALS_ONLOAD':
      return { loading: true }
    case 'FETCH_SERIALS_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        errors: null
      }
    case 'FETCH_SERIALS_ERROR':
      return { loading: false, data: null, errors: action.payload }

    case 'DELETE_SERIAL_SUCCESS':
      const id = action.payload
      const data = state.data.filter(x => x._id !== id)
      return { loading: false, data, errors: null }
    case 'DELETE_SERIAL_ERROR':
      return { loading: false, data: null, errors: action.payload }

    case 'CREATE_SERIAL_ONLOAD':
      return { loading: true }
    case 'CREATE_SERIAL_SUCCESS':
      return {
        loading: false,
        data: _.concat(state.data, action.payload),
        errors: null
      }
    case 'CREATE_SERIAL_ERROR':
      return { loading: false, data: null, errors: action.payload}
    default:
      return state
  }
}
