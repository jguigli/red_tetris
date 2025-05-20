import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import Home from '../../src/components/Home.js'

describe('Home Component', () => {
  let historyPushMock

  beforeEach(() => {
    // Create a spy for the history.push method
    historyPushMock = sinon.spy()
    
    // Mock useHistory hook
    const mockUseHistory = () => ({
      push: historyPushMock
    })
    
    // Replace the useHistory implementation
    sinon.replace(require('react-router-dom'), 'useHistory', mockUseHistory)
  })

  afterEach(() => {
    // Restore original implementation
    sinon.restore()
  })

  it('should render the home container', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(screen.getByTestId('home-container')).toBeInTheDocument()
  })

  it('should render the title and form elements', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Red Tetris')).toBeInTheDocument()
    expect(screen.getByText('Join a Room')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter player name')).toBeInTheDocument()
  })

  it('should generate a random player name on initial render', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    
    const playerNameInput = screen.getByPlaceholderText('Enter player name')
    expect(playerNameInput.value).to.match(/^Player_[a-z0-9]{6}$/)
  })

  it('should update player name when input changes', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    
    const newName = 'TestPlayer'
    const playerNameInput = screen.getByPlaceholderText('Enter player name')
    
    // Simulate input change
    playerNameInput.value = newName
    playerNameInput.dispatchEvent(new Event('change'))
    
    // Get the updated input
    expect(playerNameInput.value).to.equal(newName)
  })

  it('should render 50 room buttons', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    
    expect(screen.getAllByRole('button')).toHaveLength(50)
  })

  it('should navigate to the game route when a room is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    
    // Get the player name from the input
    const playerNameInput = screen.getByPlaceholderText('Enter player name')
    const playerName = playerNameInput.value
    
    // Click the first room button
    const firstRoomButton = screen.getAllByRole('button')[0]
    firstRoomButton.click()
    
    // Check if history.push was called with the correct path
    expect(historyPushMock.calledOnce).to.be.true
    expect(historyPushMock.firstCall.args[0]).to.equal(`/1/${playerName}`)
  })

  it('should use custom player name when navigating to game', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    
    const newName = 'CustomPlayer'
    const playerNameInput = screen.getByPlaceholderText('Enter player name')
    
    // Simulate input change
    playerNameInput.value = newName
    playerNameInput.dispatchEvent(new Event('change'))
    
    // Click room button 5
    const roomButton = screen.getAllByRole('button')[4] // 0-indexed, so 4 is room 5
    roomButton.click()
    
    // Check if history.push was called with the correct path
    expect(historyPushMock.calledOnce).to.be.true
    expect(historyPushMock.firstCall.args[0]).to.equal(`/5/${newName}`)
  })
}) 