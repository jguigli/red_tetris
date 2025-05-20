import { expect } from 'chai'
import * as actions from '../../src/actions/game.js'

describe('Game Actions', () => {
  describe('Game state actions', () => {
    it('should create an action to start game', () => {
      const expectedAction = {
        type: 'START_GAME',
        gameOn: true
      }
      expect(actions.startGame(true)).to.deep.equal(expectedAction)
    })

    it('should create an action to set game over', () => {
      const expectedAction = {
        type: 'GAME_OVER',
        gameOver: true
      }
      expect(actions.setGameOver(true)).to.deep.equal(expectedAction)
    })

    it('should create an action to set if game is reachable', () => {
      const expectedAction = {
        type: 'GAME_IS_REACHABLE',
        isReachable: true
      }
      expect(actions.gameIsReachable(true)).to.deep.equal(expectedAction)
    })
  })

  describe('Other players actions', () => {
    it('should create an action to set other players', () => {
      const otherPlayers = [
        { id: 'player1', name: 'Player 1', board: [[0]] },
        { id: 'player2', name: 'Player 2', board: [[0]] }
      ]
      const expectedAction = {
        type: 'SET_OTHER_PLAYERS',
        otherPlayers
      }
      expect(actions.setOtherPlayers(otherPlayers)).to.deep.equal(expectedAction)
    })
  })

  describe('Player actions', () => {
    it('should create an action to update board', () => {
      const board = [[0, 0], [0, 0]]
      const expectedAction = {
        type: 'UPDATE_BOARD',
        board
      }
      expect(actions.updateBoard(board)).to.deep.equal(expectedAction)
    })

    it('should create an action to update level', () => {
      const expectedAction = {
        type: 'UPDATE_LEVEL',
        level: 3
      }
      expect(actions.updateLevel(3)).to.deep.equal(expectedAction)
    })

    it('should create an action to clear lines', () => {
      const expectedAction = {
        type: 'CLEAR_LINES',
        lines: 4
      }
      expect(actions.clearLines(4)).to.deep.equal(expectedAction)
    })

    it('should create an action to set next piece', () => {
      const piece = { type: 'I', shape: [[1, 1, 1, 1]] }
      const expectedAction = {
        type: 'SET_NEXT_PIECE',
        piece
      }
      expect(actions.setNextPiece(piece)).to.deep.equal(expectedAction)
    })

    it('should create an action to set current piece', () => {
      const piece = { type: 'T', shape: [[1, 1, 1], [0, 1, 0]] }
      const expectedAction = {
        type: 'SET_CURRENT_PIECE',
        piece
      }
      expect(actions.setCurrentPiece(piece)).to.deep.equal(expectedAction)
    })

    it('should create an action to set if player is alive', () => {
      const expectedAction = {
        type: 'SET_IS_ALIVE',
        isAlive: false
      }
      expect(actions.setIsAlive(false)).to.deep.equal(expectedAction)
    })

    it('should create an action to set if player is leader', () => {
      const expectedAction = {
        type: 'SET_IS_LEADER',
        isLeader: true
      }
      expect(actions.setIsLeader(true)).to.deep.equal(expectedAction)
    })

    it('should create an action to set if player is new', () => {
      const expectedAction = {
        type: 'SET_IS_NEW',
        isNew: true
      }
      expect(actions.setIsNew(true)).to.deep.equal(expectedAction)
    })
  })

  describe('Server actions', () => {
    it('should create an action to join game server', () => {
      const expectedAction = {
        type: 'server/join_room',
        playerName: 'testPlayer',
        roomId: 'room1'
      }
      expect(actions.joinGameServer('testPlayer', 'room1')).to.deep.equal(expectedAction)
    })

    it('should create an action to leave game server', () => {
      const expectedAction = {
        type: 'server/leave_room'
      }
      expect(actions.leaveGameServer()).to.deep.equal(expectedAction)
    })

    it('should create an action to start game on server', () => {
      const expectedAction = {
        type: 'server/start_game',
        roomId: 'room1'
      }
      expect(actions.startGameServer('room1')).to.deep.equal(expectedAction)
    })

    it('should create an action to restart game on server', () => {
      const expectedAction = {
        type: 'server/restart_game',
        roomId: 'room1'
      }
      expect(actions.restartGameServer('room1')).to.deep.equal(expectedAction)
    })

    it('should create an action for player move', () => {
      const move = { type: 'left' }
      const expectedAction = {
        type: 'server/player_move',
        move
      }
      expect(actions.playerMove(move)).to.deep.equal(expectedAction)
    })
  })
}) 