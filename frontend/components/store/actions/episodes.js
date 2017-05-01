import axios from 'axios'

export const getEpisodes = () => dispatch => {
  dispatch({
    type: 'FETCH_EPISODES_ONLOAD'
  })

  axios.get('/episodes').then(response => {
    // console.log('getSerials response', response)
    dispatch({
      type: 'FETCH_EPISODES_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'FETCH_EPISODES_ERROR',
      payload: error.response
    })
  })
}

// CREATE
export const createEpisode = (data) => dispatch => {
  axios.post('/episodes', data).then(response => {
    dispatch({
      type: 'CREATE_EPISODE_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'CREATE_EPISODE_ERROR',
      payload: error.response
    })
  })
}

// // CREATE
// export const createSeral = (data) => dispatch => {
//   axios.post('serials', data).then(response => {
//     // console.log('createSeral response', response)
//     dispatch({
//       type: 'CREATE_SERIAL_SUCCESS',
//       payload: response.data
//     })
//   }, error => {
//     dispatch({
//       type: 'CREATE_SERIAL_ERROR',
//       payload: response.data
//     })
//   })
// }
//
//
// // READ
// export const getSerial = (id) => dispatch => {
//   dispatch({
//     type: 'FETCH_SERIAL_ONLOAD'
//   })
//
//   axios.get(`/serials/${id}`).then(response => {
//     dispatch({
//       type: 'FETCH_SERIAL_SUCCESS',
//       payload: response.data
//     })
//   }, error => {
//     dispatch({
//       type: 'FETCH_SERIAL_ERROR',
//       payload: error.response
//     })
//   })
// }
//
// // UPDATE
// export const updateSerial = (id, data) => dispatch => {
//   dispatch({
//     type: 'UPDATE_SERIAL_ONLOAD'
//   })
//
//   axios.put(`serials/${id}`, data).then(response => {
//     dispatch({
//       type: 'UPDATE_SERIAL_SUCCESS',
//       payload: response.data
//     })
//   }, error => {
//     dispatch({
//       type: 'UPDATE_SERIAL_ERROR',
//       payload: error.response
//     })
//   })
// }
//
// // DELETE
// export const deleteSerial = (id) => dispatch => {
//   // console.log('deleteSerial', id);
//   axios.delete(`serials/${id}`).then(response => {
//     dispatch({
//       type: 'DELETE_SERIAL_SUCCESS',
//       payload: response.data
//     })
//   }, error => {
//     dispatch({
//       type: 'DELETE_SERIAL_ERROR',
//       payload: error.response
//     })
//   })
// }
