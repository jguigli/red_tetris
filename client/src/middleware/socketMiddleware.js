import io from 'socket.io-client'
import { 
  updateBoard,
  updateLevel, 
  setGameOver, 
  clearLines, 
  setCurrentPiece,
  setNextPiece,
  setIsAlive,
  setIsLeader,
  gameIsReachable,
  startGame,
  setOtherPlayers,
  setIsNew
} from '../actions/game'

const socketMiddleware = () => {
  let socket = null

  return store => next => action => {

    if (!socket)
    {
      socket = io('http://localhost:3004')
      
      socket.on('game_update', data => {
        const { gameOn, gameOver, players } = data

        const { [socket.id]: player, ...otherPlayers } = players

        if (player.board != undefined)
          store.dispatch(updateBoard(player.board))
        if (player.level != undefined)
          store.dispatch(updateLevel(player.level))
        if (player.lines != undefined)
          store.dispatch(clearLines(player.lines))
        if (player.currentPiece != undefined)
          store.dispatch(setCurrentPiece(player.currentPiece))
        if (player.nextPiece != undefined)
          store.dispatch(setNextPiece(player.nextPiece))
        if (player.isAlive != undefined)
          store.dispatch(setIsAlive(player.isAlive))
        if (player.isLeader != undefined)
          store.dispatch(setIsLeader(player.isLeader))
        if (gameOn != undefined)
        {
          store.dispatch(startGame(gameOn))
          if (gameOn)
            store.dispatch(setIsNew(false))
        }
        if (gameOver != undefined)
          store.dispatch(setGameOver(gameOver))
        if (otherPlayers != undefined)
          store.dispatch(setOtherPlayers(otherPlayers))
      })

      socket.on('game_is_reachable', isReachable => {
        store.dispatch(gameIsReachable(isReachable))
      })
      
      socket.on('connect', () => {
        console.log('Connected to server')
      })
      
      socket.on('disconnect', () => {
        console.log('Disconnected from server')
      })
    }
    
    if (action.type && action.type.startsWith('server/')) {
      socket.emit('action', action)
    }
    
    return next(action)
  }
}

export default socketMiddleware 