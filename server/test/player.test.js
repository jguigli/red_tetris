import pkg from 'chai';
const { expect } = pkg;
import Player from '../src/player.js'
import Piece from '../src/piece.js'

describe('Player', () => {
  let mockSocket;
  let mockPiece;
  
  beforeEach(() => {
    mockSocket = {
      id: 'socket1',
      emit: () => {},
      on: () => {}
    }
    
    mockPiece = new Piece('I', 'cyan', 1)
  })
  
  describe('constructor', () => {
    it('should initialize a player as leader', () => {
      const player = new Player(mockSocket, 'Player1', true)
      
      expect(player.socket).to.equal(mockSocket)
      expect(player.name).to.equal('Player1')
      expect(player.board.length).to.equal(20)
      expect(player.board[0].length).to.equal(10)
      expect(player.isAlive).to.be.true
      expect(player.isLeader).to.be.true
      expect(player.nextPiece).to.be.null
      expect(player.currentPiece).to.be.null
      expect(player.currentPieceIndex).to.equal(0)
    })
    
    it('should initialize a player as non-leader', () => {
      const player = new Player(mockSocket, 'Player1', false)
      
      expect(player.socket).to.equal(mockSocket)
      expect(player.name).to.equal('Player1')
      expect(player.isLeader).to.be.false
    })
  })
  
  describe('board initialization', () => {
    it('should create a board with all cells set to 0', () => {
      const player = new Player(mockSocket, 'Player1', false)
      
      for (let row = 0; row < player.board.length; row++) {
        for (let col = 0; col < player.board[row].length; col++) {
          expect(player.board[row][col]).to.equal(0)
        }
      }
    })
  })
}) 