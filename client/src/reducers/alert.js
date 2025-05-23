import { ALERT_POP } from '../actions/alert.js'

const reducer = (state = {} , action) => {
  switch(action.type){
    case ALERT_POP:
      return { message: action.message }
    default: 
      return state
  }
}

export default reducer

