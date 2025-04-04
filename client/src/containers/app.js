import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link, useParams, useHistory } from 'react-router-dom'
import TetrisBoard from '../components/Board'
import Home from '../components/Home'
import Game from '../components/Game'
import GameNotreachable from '../components/GameNotReachable'
import ErrorPage from '../components/ErrorPage'
import '../components/styles.css'
import {
  startGameServer,
  restartGameServer,
  playerMove
} from '../actions/game'

const App = ({ gameOver, dispatch }) => {
  const history = useHistory()

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          dispatch(playerMove('MOVE_LEFT'))
          break
        case 'ArrowRight':
          dispatch(playerMove('MOVE_RIGHT'))
          break
        case 'ArrowDown':
          dispatch(playerMove('MOVE_DOWN'))
          break
        case 'ArrowUp':
          dispatch(playerMove('ROTATE'))
          break
        case ' ':
          dispatch(playerMove('DROP'))
          break
        case 'Escape':
          history.push("/")
          break
        case 'Enter':
          if (gameOver)
            dispatch(restartGameServer())
          else
            dispatch(startGameServer())
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameOver, dispatch])

  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:roomid/:playername">
          <Game />
        </Route>
        <Route path="/not_reachable">
          <GameNotreachable />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  )
}

const mapStateToProps = state => ({
  gameOver: state.game ? state.game.gameOver : false,
})

export default connect(mapStateToProps)(App)