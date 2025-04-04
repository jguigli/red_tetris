import { combineReducers } from 'redux'
import alert from './alert'
import game from './game'

export default combineReducers({
  message: alert,
  game
})