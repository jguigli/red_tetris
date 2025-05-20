import { expect } from 'chai'
import gameReducer from '../../src/reducers/game.js'

describe('Game Reducer', () => {
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

  it('should return the initial state', () => {
    expect(gameReducer(undefined, {})).to.deep.equal(initialState)
  })

  it('should handle START_GAME', () => {
    const action = {
      type: 'START_GAME',
      gameOn: true
    }
    const expectedState = {
      ...initialState,
      gameOn: true,
      gameOver: false
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle GAME_OVER', () => {
    const action = {
      type: 'GAME_OVER',
      gameOver: true
    }
    const expectedState = {
      ...initialState,
      gameOver: true
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle GAME_IS_REACHABLE', () => {
    const action = {
      type: 'GAME_IS_REACHABLE',
      isReachable: false
    }
    const expectedState = {
      ...initialState,
      isReachable: false
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle SET_OTHER_PLAYERS', () => {
    const otherPlayers = {
      'player1': { name: 'Player 1', board: [[0]] },
      'player2': { name: 'Player 2', board: [[0]] }
    }
    const action = {
      type: 'SET_OTHER_PLAYERS',
      otherPlayers
    }
    const expectedState = {
      ...initialState,
      otherPlayers
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle UPDATE_BOARD', () => {
    const board = Array(20).fill(Array(10).fill(1))
    const action = {
      type: 'UPDATE_BOARD',
      board
    }
    const expectedState = {
      ...initialState,
      board
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle UPDATE_LEVEL', () => {
    const action = {
      type: 'UPDATE_LEVEL',
      level: 5
    }
    const expectedState = {
      ...initialState,
      level: 5
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle CLEAR_LINES', () => {
    const action = {
      type: 'CLEAR_LINES',
      lines: 4
    }
    const expectedState = {
      ...initialState,
      lines: 4
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle SET_NEXT_PIECE', () => {
    const piece = { type: 'I', shape: [[1, 1, 1, 1]] }
    const action = {
      type: 'SET_NEXT_PIECE',
      piece
    }
    const expectedState = {
      ...initialState,
      nextPiece: piece
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle SET_CURRENT_PIECE', () => {
    const piece = { type: 'T', shape: [[1, 1, 1], [0, 1, 0]] }
    const action = {
      type: 'SET_CURRENT_PIECE',
      piece
    }
    const expectedState = {
      ...initialState,
      currentPiece: piece
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle SET_IS_LEADER', () => {
    const action = {
      type: 'SET_IS_LEADER',
      isLeader: true
    }
    const expectedState = {
      ...initialState,
      isLeader: true
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle SET_IS_ALIVE', () => {
    const action = {
      type: 'SET_IS_ALIVE',
      isAlive: false
    }
    const expectedState = {
      ...initialState,
      isAlive: false
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })

  it('should handle SET_IS_NEW', () => {
    const action = {
      type: 'SET_IS_NEW',
      isNew: false
    }
    const expectedState = {
      ...initialState,
      isNew: false
    }
    expect(gameReducer(initialState, action)).to.deep.equal(expectedState)
  })
}) 