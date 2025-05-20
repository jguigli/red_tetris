import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter, Route } from 'react-router-dom'
import sinon from 'sinon'
import Game from '../../src/components/Game.js'
import * as actions from '../../src/actions/game.js'

describe('Game Component', () => {
  const mockStore = configureMockStore()

  // Setup default state for testing
  const getInitialState = (overrides = {}) => ({
    game: {
      isReachable: true,
      gameOn: false,
      gameOver: false,
      isLeader: false,
      isAlive: true,
      isNew: true,
      ...overrides
    }
  })

  // Mock the router params
  const renderWithRouter = (ui, { path = '/', route = '/', ...renderOptions } = {}) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Route path={path}>{ui}</Route>
      </MemoryRouter>,
      renderOptions
    )
  }

  beforeEach(() => {
    // Restore sinon stubs
    sinon.restore()
  })

  it('should render the game wrapper', () => {
    const store = mockStore(getInitialState())
    render(
      <Provider store={store}>
        <Game />
      </Provider>
    )
    expect(screen.getByTestId('game-wrapper')).toBeInTheDocument()
  })

  it('should call joinGameServer on mount with roomid and playername', () => {
    // Spy on the actions
    const joinGameServerSpy = sinon.spy(actions, 'joinGameServer')
    
    const store = mockStore(getInitialState())
    store.dispatch = sinon.spy()
    
    renderWithRouter(
      <Provider store={store}>
        <Game />
      </Provider>,
      {
        path: '/:roomid/:playername',
        route: '/123/testPlayer'
      }
    )
    
    // Since we're using a spy on the action creator, we expect it to be called
    // The actual dispatch would be handled by the connected component
    expect(joinGameServerSpy.calledOnce).to.be.true
    expect(joinGameServerSpy.firstCall.args).to.deep.equal(['testPlayer', '123'])
  })

  it('should call leaveGameServer on unmount', () => {
    // Spy on the actions
    const leaveGameServerSpy = sinon.spy(actions, 'leaveGameServer')
    const setIsNewSpy = sinon.spy(actions, 'setIsNew')
    
    const store = mockStore(getInitialState())
    store.dispatch = sinon.spy()
    
    const { unmount } = renderWithRouter(
      <Provider store={store}>
        <Game />
      </Provider>,
      {
        path: '/:roomid/:playername',
        route: '/123/testPlayer'
      }
    )
    
    // Unmount the component
    unmount()
    
    // Check if the right actions would be dispatched
    expect(leaveGameServerSpy.calledOnce).to.be.true
    expect(setIsNewSpy.calledOnce).to.be.true
    expect(setIsNewSpy.firstCall.args).to.deep.equal([true])
  })

  it('should redirect to /not_reachable if isReachable is false', () => {
    const store = mockStore(getInitialState({ isReachable: false }))
    const historyPushMock = sinon.spy()
    
    // Mock useHistory hook
    const mockUseHistory = () => ({
      push: historyPushMock
    })
    
    // Mock the React Router's useHistory
    sinon.replace(require('react-router-dom'), 'useHistory', mockUseHistory)
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </Provider>
    )
    
    expect(historyPushMock.calledOnce).to.be.true
    expect(historyPushMock.firstCall.args[0]).to.equal('/not_reachable')
  })

  it('should show "You win" message when player is alive and game is over', () => {
    const store = mockStore(getInitialState({
      isAlive: true,
      gameOver: true,
      isNew: false
    }))
    
    renderWithRouter(
      <Provider store={store}>
        <Game />
      </Provider>,
      {
        path: '/:roomid/:playername',
        route: '/123/testPlayer'
      }
    )
    
    expect(screen.getByText('Game OVER : You win')).toBeInTheDocument()
  })

  it('should show "You lose" message when player is not alive', () => {
    const store = mockStore(getInitialState({
      isAlive: false
    }))
    
    renderWithRouter(
      <Provider store={store}>
        <Game />
      </Provider>,
      {
        path: '/:roomid/:playername',
        route: '/123/testPlayer'
      }
    )
    
    expect(screen.getByText('Game OVER : You lose')).toBeInTheDocument()
  })

  it('should show leader message when player is leader and game is not on', () => {
    const store = mockStore(getInitialState({
      isLeader: true,
      gameOn: false
    }))
    
    renderWithRouter(
      <Provider store={store}>
        <Game />
      </Provider>,
      {
        path: '/:roomid/:playername',
        route: '/123/testPlayer'
      }
    )
    
    expect(screen.getByText('Press Enter to launch the game')).toBeInTheDocument()
  })

  it('should show waiting message when player is not leader and game is not on', () => {
    const store = mockStore(getInitialState({
      isLeader: false,
      gameOn: false
    }))
    
    renderWithRouter(
      <Provider store={store}>
        <Game />
      </Provider>,
      {
        path: '/:roomid/:playername',
        route: '/123/testPlayer'
      }
    )
    
    expect(screen.getByText('Waiting for the leader to start the game')).toBeInTheDocument()
  })
}) 