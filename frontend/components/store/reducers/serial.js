const defaultState = {
  loading: false,
  errors: null,
  data: null,
}

export default function serial(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_SERIAL_ONLOAD':
      return { loading: true }
    case 'FETCH_SERIAL_SUCCESS':
      return { loading: false, data: action.payload, errors: null }
    case 'FETCH_SERIAL_ERROR':
      return { loading: false, data: null, errors: action.payload }
    case 'UPDATE_SERIAL_ONLOAD':
      return { loading: true, data: state.data, errors: null }
    case 'UPDATE_SERIAL_SUCCESS':
      const newObj = _.assign(state.data, action.payload)
      return { loading: false, data: newObj, errors: null }
    case 'UPDATE_SERIAL_ERROR':
      return { loading: false, data: null, errors: action.payload }
    default:
      return state
  }
}
