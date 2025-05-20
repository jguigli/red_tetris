import React from 'react'
import { render, screen } from '@testing-library/react'
import { TetrisBoard } from '../../src/components/Board.js'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

describe('TetrisBoard Component', () => {
  // Mock data for testing
  const mockProps = {
    board: Array(20).fill(Array(10).fill(null)),
    currentPiece: {
      shape: [[1, 1, 1, 1]],
      color: 'cyan',
      x: 3,
      y: 0
    },
    nextPiece: {
      shape: [[1, 1], [1, 1]],
      color: 'yellow'
    },
    level: 3,
    lines: 10,
    gameOn: true,
    otherPlayers: {
      'player1': {
        name: 'Player 1',
        spectrum: Array(20).fill(Array(10).fill(null))
      },
      'player2': {
        name: 'Player 2',
        spectrum: Array(20).fill(Array(10).fill(null))
      }
    }
  }

  it('should render without crashing', () => {
    render(<TetrisBoard {...mockProps} />)
    expect(screen.getByTestId('tetris-container')).toBeInTheDocument()
  })

  it('should render all main components', () => {
    render(<TetrisBoard {...mockProps} />)
    expect(screen.getByTestId('tetris-container')).toBeInTheDocument()
    expect(screen.getByTestId('left-panel')).toBeInTheDocument()
    expect(screen.getByTestId('center-panel')).toBeInTheDocument()
    expect(screen.getByTestId('right-panel')).toBeInTheDocument()
  })

  describe('Cell Component', () => {
    it('should render with the provided color', () => {
      render(<TetrisBoard {...mockProps} />)
      const cell = screen.getByTestId('cell')
      expect(cell).toHaveStyle({ backgroundColor: 'cyan' })
    })
  })

  describe('SpecterGrid Component', () => {
    it('should render the correct number of player specters', () => {
      render(<TetrisBoard {...mockProps} />)
      
      expect(screen.getAllByTestId('specter')).toHaveLength(2)
      expect(screen.getByText('Player 1')).toBeInTheDocument()
      expect(screen.getByText('Player 2')).toBeInTheDocument()
    })
  })

  describe('Grid Component', () => {
    it('should render the game board with the current piece', () => {
      render(<TetrisBoard {...mockProps} />)
      
      expect(screen.getByTestId('grid')).toBeInTheDocument()
      expect(screen.getAllByTestId('cell')).toHaveLength(200) // 20 rows * 10 cells per row
    })
  })

  describe('Preview Component', () => {
    it('should render the next piece preview', () => {
      render(<TetrisBoard {...mockProps} />)
      
      expect(screen.getByTestId('preview')).toBeInTheDocument()
      expect(screen.getByText('Next:')).toBeInTheDocument()
      expect(screen.getByTestId('preview-grid')).toBeInTheDocument()
    })
  })

  describe('GameInfo Component', () => {
    it('should display the correct level and lines', () => {
      render(<TetrisBoard {...mockProps} />)
      
      expect(screen.getByTestId('game-info')).toBeInTheDocument()
      expect(screen.getAllByTestId('info-item')).toHaveLength(2)
      
      const levelValue = screen.getAllByTestId('info-value')[0].textContent
      const linesValue = screen.getAllByTestId('info-value')[1].textContent
      
      expect(levelValue).toBe('3')
      expect(linesValue).toBe('10')
    })
  })

  // describe('Connected Component', () => {
  //   it('should connect to Redux store', () => {
  //     const mockStore = configureMockStore()
  //     const initialState = {
  //       game: {
  //         board: Array(20).fill(Array(10).fill(null)),
  //         currentPiece: null,
  //         nextPiece: null,
  //         level: 1,
  //         lines: 0,
  //         gameOn: false,
  //         otherPlayers: {}
  //       }
  //     }
  //     const store = mockStore(initialState)
      
  //     // Import the connected component
  //     const ConnectedBoard = require('../../src/components/Board.js').default
      
  //     const wrapper = render(
  //       <Provider store={store}>
  //         <ConnectedBoard />
  //       </Provider>
  //     )
      
  //     expect(screen.getByTestId('tetris-container')).toBeInTheDocument()
  //   })
  // })
}) 