import { combineReducers } from 'redux'
import alertReducer from './alert.js'
import gameReducer from './game.js'

export default combineReducers({
  alert: alertReducer,
  game: gameReducer
})