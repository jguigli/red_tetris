const initialState = {
  gameOn: false,
  board: Array(20).fill(Array(10).fill(null)),
  level: 1,
  lines: 0,
  currentPiece: null,
  nextPiece: null,
  gameOver: false,
  isAlive: true,
  isLeader: false,
  otherPlayers: {},
  isReachable: true,
  isNew: true
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameOn: action.gameOn,
        gameOver: false,
      }
      
    case 'GAME_OVER':
      return {
        ...state,
        gameOver: action.gameOver
      }

    case 'GAME_IS_REACHABLE':
      return {
        ...state,
        isReachable: action.isReachable
      }

    case 'SET_OTHER_PLAYERS':
      return {
        ...state,
        otherPlayers: action.otherPlayers
      }
      
    case 'UPDATE_BOARD':
      return {
        ...state,
        board: action.board
      }
      
    case 'UPDATE_LEVEL':
      return {
        ...state,
        level: action.level
      }
      
    case 'CLEAR_LINES':
      return {
        ...state,
        lines: action.lines
      }
      
    case 'SET_NEXT_PIECE':
      return {
        ...state,
        nextPiece: action.piece
      }

    case 'SET_CURRENT_PIECE':
      return {
        ...state,
        currentPiece: action.piece
      }

    case 'SET_IS_LEADER':
      return {
        ...state,
        isLeader: action.isLeader
      }

    case 'SET_IS_ALIVE':
      return {
        ...state,
        isAlive: action.isAlive
      }

    case 'SET_IS_NEW':
      return {
        ...state,
        isNew: action.isNew
      }
      
    default:
      return state
  }
} 
