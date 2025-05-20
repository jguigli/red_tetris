import pkg from 'chai';
const { expect } = pkg;
import Game from '../src/game.js'
// import Player from '../src/player'
import Piece from '../src/piece.js'

describe('Game', () => {
  let game
  let mockSocket1
  let mockSocket2
  
  beforeEach(() => {
    game = new Game()
    
    mockSocket1 = {
      id: 'socket1',
      emit: () => {},
      on: () => {}
    }
    
    mockSocket2 = {
      id: 'socket2',
      emit: () => {},
      on: () => {}
    }
  })
  
  describe('constructor', () => {
    it('should initialize game with empty rooms object', () => {
      expect(game.rooms).to.be.an('object')
      expect(Object.keys(game.rooms).length).to.equal(0)
    })
  })
  
  describe('createGame', () => {
    it('should create a new game room', () => {
      game.createGame('room1')
      
      expect(game.rooms).to.have.property('room1')
      expect(game.rooms.room1.players).to.be.an('object')
      expect(game.rooms.room1.gameOn).to.be.false
      expect(game.rooms.room1.gameOver).to.be.false
      expect(game.rooms.room1.pieceQueue).to.be.an('array')
    })
  })
  
  describe('addPlayer', () => {
    beforeEach(() => {
      game.createGame('room1')
    })
    
    it('should add a player to the room', () => {
      game.addPlayer('room1', mockSocket1, 'Player1')
      
      expect(game.rooms.room1.players).to.have.property(mockSocket1.id)
      expect(game.rooms.room1.players[mockSocket1.id].name).to.equal('Player1')
      expect(game.rooms.room1.players[mockSocket1.id].isLeader).to.be.true
    })
    
    it('should make first player a leader and subsequent players non-leaders', () => {
      game.addPlayer('room1', mockSocket1, 'Player1')
      game.addPlayer('room1', mockSocket2, 'Player2')
      
      expect(game.rooms.room1.players[mockSocket1.id].isLeader).to.be.true
      expect(game.rooms.room1.players[mockSocket2.id].isLeader).to.be.false
    })
    
    it('should not add player if room does not exist', () => {
      game.addPlayer('nonexistent', mockSocket1, 'Player1')
      
      expect(game.rooms).to.not.have.property('nonexistent')
    })
  })
  
  describe('removePlayer', () => {
    beforeEach(() => {
      game.createGame('room1')
      game.addPlayer('room1', mockSocket1, 'Player1')
      game.addPlayer('room1', mockSocket2, 'Player2')
    })
    
    it('should remove a player from the room', () => {
      game.removePlayer('room1', mockSocket2)
      
      expect(game.rooms.room1.players).to.not.have.property(mockSocket2.id)
      expect(Object.keys(game.rooms.room1.players).length).to.equal(1)
    })
    
    it('should transfer leadership when leader leaves', () => {
      game.removePlayer('room1', mockSocket1)
      
      expect(game.rooms.room1.players[mockSocket2.id].isLeader).to.be.true
    })
    
    it('should delete room when last player leaves', () => {
      game.removePlayer('room1', mockSocket1)
      game.removePlayer('room1', mockSocket2)
      
      expect(game.rooms).to.not.have.property('room1')
    })
    
    it('should not do anything if room does not exist', () => {
      game.removePlayer('nonexistent', mockSocket1)
      
      expect(game.rooms).to.not.have.property('nonexistent')
    })
    
    it('should not do anything if player does not exist in room', () => {
      const mockSocket3 = { id: 'socket3', emit: () => {}, on: () => {} }
      game.removePlayer('room1', mockSocket3)
      
      expect(Object.keys(game.rooms.room1.players).length).to.equal(2)
    })
  })
  
  describe('startGame', () => {
    beforeEach(() => {
      game.createGame('room1')
      game.addPlayer('room1', mockSocket1, 'Player1')
      game.addPlayer('room1', mockSocket2, 'Player2')
    })
    
    it('should start the game when leader requests', () => {
      const result = game.startGame('room1', mockSocket1)
      
      expect(result).to.be.true
      expect(game.rooms.room1.gameOn).to.be.true
    })
    
    it('should not start the game when non-leader requests', () => {
      const result = game.startGame('room1', mockSocket2)
      
      expect(result).to.be.false
      expect(game.rooms.room1.gameOn).to.be.false
    })
    
    it('should not start the game if room does not exist', () => {
      const result = game.startGame('nonexistent', mockSocket1)
      
      expect(result).to.be.false
    })
    
    it('should not start the game if player does not exist in room', () => {
      const mockSocket3 = { id: 'socket3', emit: () => {}, on: () => {} }
      const result = game.startGame('room1', mockSocket3)
      
      expect(result).to.be.false
      expect(game.rooms.room1.gameOn).to.be.false
    })
    
    it('should not start the game if it is already started', () => {
      game.startGame('room1', mockSocket1)
      const result = game.startGame('room1', mockSocket1)
      
      expect(result).to.be.false
    })
  })
  
  describe('gameisOn', () => {
    it('should return false if room does not exist', () => {
      const result = game.gameisOn('nonexistent')
      
      expect(result).to.be.false
    })
    
    it('should return false if game is not on', () => {
      game.createGame('room1')
      
      const result = game.gameisOn('room1')
      
      expect(result).to.be.false
    })
    
    it('should return true if game is on', () => {
      game.createGame('room1')
      game.addPlayer('room1', mockSocket1, 'Player1')
      game.startGame('room1', mockSocket1)
      
      const result = game.gameisOn('room1')
      
      expect(result).to.be.true
    })
  })
  
  describe('getNextPiece', () => {
    beforeEach(() => {
      game.createGame('room1')
      game.addPlayer('room1', mockSocket1, 'Player1')
    })
    
    it('should return a piece', () => {
      const piece = game.getNextPiece('room1', mockSocket1.id)
      
      expect(piece).to.be.instanceOf(Piece)
    })
    
    it('should increment player\'s piece index', () => {
      const initialIndex = game.rooms.room1.players[mockSocket1.id].currentPieceIndex
      game.getNextPiece('room1', mockSocket1.id)
      
      const newIndex = game.rooms.room1.players[mockSocket1.id].currentPieceIndex
      expect(newIndex).to.equal(initialIndex + 1)
    })
  })
  
  describe('generateNewSequence', () => {
    it('should return an array of piece types', () => {
      const sequence = game.generateNewSequence()
      
      expect(sequence).to.be.an('array')
      sequence.forEach(type => {
        expect(Piece.getKeys()).to.include(type)
      })
    })
  })
  
  describe('checkGameOver', () => {
    beforeEach(() => {
      game.createGame('room1')
      game.addPlayer('room1', mockSocket1, 'Player1')
      game.addPlayer('room1', mockSocket2, 'Player2')
    })
    
    it('should return false if more than one player is alive', () => {
      game.rooms.room1.players[mockSocket1.id].isAlive = true
      game.rooms.room1.players[mockSocket2.id].isAlive = true
      
      const result = game.checkGameOver('room1')
      
      expect(result).to.be.false
    })
    
    it('should return true if only one player is alive in multiplayer', () => {
      game.rooms.room1.players[mockSocket1.id].isAlive = true
      game.rooms.room1.players[mockSocket2.id].isAlive = false
      
      const result = game.checkGameOver('room1')
      
      expect(result).to.be.true
    })
    
    it('should return true if no player is alive in single player', () => {
      delete game.rooms.room1.players[mockSocket2.id]
      game.rooms.room1.players[mockSocket1.id].isAlive = false
      
      const result = game.checkGameOver('room1')
      
      expect(result).to.be.true
    })
  })
}) 