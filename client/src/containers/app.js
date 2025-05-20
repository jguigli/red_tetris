import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../components/Home.js'
import Game from '../components/Game.js'
import GameNotreachable from '../components/GameNotReachable.js'
import ErrorPage from '../components/ErrorPage.js'
import '../components/styles.css'
import {
  startGameServer,
  restartGameServer,
  playerMove
} from '../actions/game.js'

const App = ({ gameOver, dispatch }) => {
  const navigate = useNavigate();

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
          navigate('/');
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:roomid/:playername" element={<Game />} />
        <Route path="/not_reachable" element={<GameNotreachable />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

const mapStateToProps = state => ({
  gameOver: state.game ? state.game.gameOver : false,
})

export default connect(mapStateToProps)(App)