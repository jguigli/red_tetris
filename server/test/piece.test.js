import pkg from 'chai';
const { expect } = pkg;
import Piece from '../src/piece.js'

describe('Piece', () => {
  describe('constructor', () => {
    it('should create a piece with the correct properties', () => {
      const piece = new Piece('I', 0, 0)
      
      expect(piece.color).to.equal('cyan')
      expect(piece.shape).to.be.an('array')
    })
    
    it('should throw an error for invalid piece type', () => {
      expect(() => new Piece('X', 'black', 0)).to.throw('Invalid piece type')
    })
  })
  
  describe('rotation', () => {
    it('should rotate I piece correctly and return to original after 4 rotations', () => {
      const piece = new Piece('I', 0, 0)
      const originalShape = JSON.parse(JSON.stringify(piece.shape))
      
      piece.rotate()
      expect(piece.shape).to.not.deep.equal(originalShape)
      
      piece.rotate()
      piece.rotate()
      piece.rotate()
      expect(piece.shape).to.deep.equal(originalShape)
    })
    
    it('should not change O piece shape when rotated', () => {
      const piece = new Piece('O', 0, 0)
      const originalShape = JSON.parse(JSON.stringify(piece.shape))
      
      piece.rotate()
      expect(piece.shape).to.deep.equal(originalShape)
    })
    
    it('should rotate T piece correctly', () => {
      const piece = new Piece('T', 0, 0)
      const originalShape = JSON.parse(JSON.stringify(piece.shape))
      
      piece.rotate()
      expect(piece.shape).to.not.deep.equal(originalShape)
    })
    
    it('should rotate L piece correctly', () => {
      const piece = new Piece('L', 0, 0)
      const originalShape = JSON.parse(JSON.stringify(piece.shape))
      
      piece.rotate()
      expect(piece.shape).to.not.deep.equal(originalShape)
    })
    
    it('should rotate J piece correctly', () => {
      const piece = new Piece('J', 0, 0)
      const originalShape = JSON.parse(JSON.stringify(piece.shape))
      
      piece.rotate()
      expect(piece.shape).to.not.deep.equal(originalShape)
    })
    
    it('should rotate S piece correctly', () => {
      const piece = new Piece('S', 0, 0)
      const originalShape = JSON.parse(JSON.stringify(piece.shape))
      
      piece.rotate()
      expect(piece.shape).to.not.deep.equal(originalShape)
    })
    
    it('should rotate Z piece correctly', () => {
      const piece = new Piece('Z', 0, 0)
      const originalShape = JSON.parse(JSON.stringify(piece.shape))
      
      piece.rotate()
      expect(piece.shape).to.not.deep.equal(originalShape)
    })
  })
  
  describe('static methods', () => {
    it('should return all piece types', () => {
      const keys = Piece.getKeys()
      
      expect(keys).to.be.an('array')
      expect(keys).to.include('I')
      expect(keys).to.include('O')
      expect(keys).to.include('T')
      expect(keys).to.include('L')
      expect(keys).to.include('J')
      expect(keys).to.include('S')
      expect(keys).to.include('Z')
      expect(keys.length).to.equal(7)
    })
  })
}) 