import React from 'react'
import { createRoot } from 'react-dom/client'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { storeStateMiddleWare } from './middleware/storeStateMiddleWare.js'
import socketMiddleware from './middleware/socketMiddleware.js'
import reducer from './reducers/index.js'
import App from './containers/app.js'
import { alert } from './actions/alert.js'

const initialState = {}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      thunk,
      socketMiddleware(),
      storeStateMiddleWare,
      createLogger()
    ),
  preloadedState: initialState,
})

const container = document.getElementById('tetris')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
)

store.dispatch(alert('Ready to play Tetris! Press Start to begin.'))

export default store;