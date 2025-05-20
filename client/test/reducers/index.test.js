import { expect } from 'chai'
import rootReducer from '../../src/reducers/index.js'
import gameReducer from '../../src/reducers/game.js'
import alertReducer from '../../src/reducers/alert.js'

describe('Root Reducer', () => {
  it('should combine all reducers', () => {
    const action = {}
    const state = rootReducer(undefined, action)
    
    expect(state).to.have.property('alert')
    expect(state).to.have.property('game')

    // Verify that the combined state matches what individual reducers would return
    expect(state.alert).to.deep.equal(alertReducer(undefined, action))
    expect(state.game).to.deep.equal(gameReducer(undefined, action))
  })
}) 