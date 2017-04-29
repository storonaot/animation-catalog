import axios from 'axios'

export const getSerials = () => dispatch => {
  dispatch({
    type: 'FETCH_SERIALS_ONLOAD'
  })

  axios.get('/serials').then(response => {
    dispatch({
      type: 'FETCH_SERIALS_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'FETCH_SERIALS_ERROR',
      payload: error.response
    })
  })
}

export const deleteSerial = (id) => dispatch => {
  axios.delete(`serials/${id}`).then(response => {
    dispatch({
      type: 'DELETE_SERIAL_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'DELETE_SERIAL_ERROR',
      payload: error.response
    })
  })
}

export const addSeral = (data) => dispatch => {
  axios.post('serials', data).then(response => {
    dispatch({
      type: 'CREATE_SERIAL_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'CREATE_SERIAL_ERROR',
      payload: response.data
    })
  })
}

export const getSerial = (id) => dispatch => {
  dispatch({
    type: 'FETCH_SERIAL_ONLOAD'
  })

  axios.get(`/serials/${id}`).then(response => {
    dispatch({
      type: 'FETCH_SERIAL_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'FETCH_SERIAL_ERROR',
      payload: error.response
    })
  })
}


export const updateSerial = (id, data) => dispatch => {
  dispatch({
    type: 'UPDATE_SERIAL_ONLOAD'
  })

  axios.put(`serials/${id}`, data).then(response => {
    dispatch({
      type: 'UPDATE_SERIAL_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'UPDATE_SERIAL_ERROR',
      payload: error.response
    })
  })
}
