import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import socketMiddleware from './middleware/socketMiddleware'
import reducer from './reducers'
import App from './containers/app'
import { alert } from './actions/alert'

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    thunk,
    socketMiddleware(),
    storeStateMiddleWare,
    createLogger()
  )
)

ReactDom.render((
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
), document.getElementById('tetris'))

store.dispatch(alert('Ready to play Tetris! Press Start to begin.'))
