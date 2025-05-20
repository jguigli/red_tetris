import { expect } from 'chai'
import alertReducer from '../../src/reducers/alert.js'
import { ALERT_POP } from '../../src/actions/alert.js'

describe('Alert Reducer', () => {
  it('should return the initial state', () => {
    expect(alertReducer(undefined, {})).to.deep.equal({})
  })

  it('should handle ALERT_POP', () => {
    const message = 'Test alert message'
    const action = {
      type: ALERT_POP,
      message
    }
    const expectedState = { message }
    expect(alertReducer({}, action)).to.deep.equal(expectedState)
  })
}) 