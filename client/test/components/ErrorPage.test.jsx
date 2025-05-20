import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import ErrorPage from '../../src/components/ErrorPage.js'

describe('ErrorPage Component', () => {
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

  it('should render the error container', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    )
    expect(screen.getByTestId('error-container')).toBeInTheDocument()
  })

  it('should display error message and instructions', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Error: Invalid URL')).toBeInTheDocument()
    expect(screen.getByText('Please use the format: /room_id/player_name')).toBeInTheDocument()
    expect(screen.getByText('Example: http:localhost:8080/1/player1')).toBeInTheDocument()
  })

  it('should have a Go to Home button', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Go to Home')).toBeInTheDocument()
  })

  it('should navigate to home when button is clicked', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    )
    
    const homeButton = screen.getByText('Go to Home')
    homeButton.click()
    
    expect(historyPushMock.calledOnce).to.be.true
    expect(historyPushMock.firstCall.args[0]).to.equal('/')
  })
}) 