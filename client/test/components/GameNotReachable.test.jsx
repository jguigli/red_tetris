import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import GameNotReachable from '../../src/components/GameNotReachable.js'

describe('GameNotReachable Component', () => {
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

  it('should render the not-reachable container', () => {
    render(
      <MemoryRouter>
        <GameNotReachable />
      </MemoryRouter>
    )
    expect(screen.getByTestId('not-reachable-container')).toBeInTheDocument()
  })

  it('should display game in progress message and instructions', () => {
    render(
      <MemoryRouter>
        <GameNotReachable />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Game already in progress')).toBeInTheDocument()
    expect(screen.getByText('The game you are trying to join is currently in progress.')).toBeInTheDocument()
    expect(screen.getByText('Please wait for the next game to start or try joining later.')).toBeInTheDocument()
  })

  it('should have a Go to Home button', () => {
    render(
      <MemoryRouter>
        <GameNotReachable />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Go to Home')).toBeInTheDocument()
  })

  it('should navigate to home when button is clicked', () => {
    render(
      <MemoryRouter>
        <GameNotReachable />
      </MemoryRouter>
    )
    
    const homeButton = screen.getByText('Go to Home')
    homeButton.click()
    
    expect(historyPushMock.calledOnce).to.be.true
    expect(historyPushMock.firstCall.args[0]).to.equal('/')
  })
}) 