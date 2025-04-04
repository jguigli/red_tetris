////////////////////////// Game //////////////////////////

export const startGame = (gameOn) => ({
  type: 'START_GAME',
  gameOn
})

export const setGameOver = (gameOver) => ({
  type: 'GAME_OVER',
  gameOver
})

export const gameIsReachable = (isReachable) => ({
  type: 'GAME_IS_REACHABLE',
  isReachable
})

////////////////////////// Other players //////////////////////////

export const setOtherPlayers = (otherPlayers) => ({
  type: 'SET_OTHER_PLAYERS',
  otherPlayers
})

////////////////////////// Player //////////////////////////

export const updateBoard = (board) => ({
  type: 'UPDATE_BOARD',
  board
})

export const updateLevel = (level) => ({
  type: 'UPDATE_LEVEL',
  level
})

export const clearLines = (lines) => ({
  type: 'CLEAR_LINES',
  lines
})

export const setNextPiece = (piece) => ({
  type: 'SET_NEXT_PIECE',
  piece
})

export const setCurrentPiece = (piece) => ({
  type: 'SET_CURRENT_PIECE',
  piece
})

export const setIsAlive = (isAlive) => ({
  type: 'SET_IS_ALIVE',
  isAlive
})

export const setIsLeader = (isLeader) => ({
  type: 'SET_IS_LEADER',
  isLeader
})

export const setIsNew = (isNew) => ({
  type: 'SET_IS_NEW',
  isNew
})

////////////////////////// Server //////////////////////////

export const joinGameServer = (playerName, roomId) => ({
  type: 'server/join_room',
  playerName,
  roomId
})

export const leaveGameServer = () => ({
  type: 'server/leave_room'
})

export const startGameServer = (roomId) => ({
  type: 'server/start_game',
  roomId
})

export const restartGameServer = (roomId) => ({
  type: 'server/restart_game',
  roomId
})

export const playerMove = (move) => ({
  type: 'server/player_move',
  move
})
