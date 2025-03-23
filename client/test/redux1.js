import {configureStore} from './helpers/server'
import rootReducer from '../src/reducers'
import {ALERT_POP, alert} from '../src/actions/alert'
import chai from "chai"

const MESSAGE = "message"

chai.should()

describe('Redux test', function(){
  it('alert action test', function(done){
    const initialState = {}
    const store =  configureStore(rootReducer, null, initialState, {
      ALERT_POP: ({dispatch, getState}) =>  {
        const state = getState()
        state.message.should.equal(MESSAGE)
        done()
      }
    })
    store.dispatch(alert(MESSAGE))
  });
}); 