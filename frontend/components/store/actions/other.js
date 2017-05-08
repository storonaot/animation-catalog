import axios from 'axios'

export const getCountries = () => dispatch => {

  dispatch({
    type: 'FETCH_COUNTRIES_ONLOAD'
  })

  axios.get('/countries').then(response => {
    dispatch({
      type: 'FETCH_COUNTRIES_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'FETCH_COUNTRIES_ERROR',
      payload: error.response
    })
  })
}

export const getDirectors = () => dispatch => {

  dispatch({
    type: 'FETCH_DIRECTORS_ONLOAD'
  })

  axios.get('/directors').then(response => {
    dispatch({
      type: 'FETCH_DIRECTORS_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'FETCH_DIRECTORS_ERROR',
      payload: error.response
    })
  })
}

export const getStudios = () => dispatch => {

  dispatch({
    type: 'FETCH_STUDIOS_ONLOAD'
  })

  axios.get('/studios').then(response => {
    dispatch({
      type: 'FETCH_STUDIOS_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'FETCH_STUDIOS_ERROR',
      payload: error.response
    })
  })
}

// export const getTranslators = () => dispatch => {
//   dispatch({
//     type: 'FETCH_TRANSLATORS_ONLOAD'
//   })
//
//   axios.get('/translators').then(response => {
//     dispatch({
//       type: 'FETCH_TRANSLATORS_SUCCESS',
//       payload: response.data
//     })
//   }, error => {
//     dispatch({
//       type: 'FETCH_TRANSLATORS_ERROR',
//       payload: error.response
//     })
//   })
// }

// export const getVoiceovers = () => dispatch => {
//   dispatch({
//     type: 'FETCH_VOICEOVERS_ONLOAD'
//   })
//
//   axios.get('/voiceovers').then(response => {
//     dispatch({
//       type: 'FETCH_VOICEOVERS_SUCCESS',
//       payload: response.data
//     })
//   }, error => {
//     dispatch({
//       type: 'FETCH_VOICEOVERS_ERROR',
//       payload: error.response
//     })
//   })
// }

export const getVideoformats = () => dispatch => {
  dispatch({
    type: 'FETCH_VIDEOFORMATS_ONLOAD'
  })

  axios.get('/videoformats').then(response => {
    dispatch({
      type: 'FETCH_VIDEOFORMATS_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'FETCH_VIDEOFORMATS_ERROR',
      payload: error.response
    })
  })
}

export const getMediacontainers = () => dispatch => {
  dispatch({
    type: 'FETCH_MEDIACONTAINERS_ONLOAD'
  })

  axios.get('/mediacontainers').then(response => {
    dispatch({
      type: 'FETCH_MEDIACONTAINERS_SUCCESS',
      payload: response.data
    })
  }, error => {
    dispatch({
      type: 'FETCH_MEDIACONTAINERS_ERROR',
      payload: error.response
    })
  })
}
