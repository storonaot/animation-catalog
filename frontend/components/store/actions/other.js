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
