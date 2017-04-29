import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import serials from './serials'
import serial from './serial'

import countries from './countries'
import directors from './directors'
import studios from './studios'

export default combineReducers({
  routing: routerReducer,
  serials,
  serial,
  countries,
  directors,
  studios
})
