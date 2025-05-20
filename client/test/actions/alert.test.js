import { expect } from 'chai'
import { alert, ALERT_POP } from '../../src/actions/alert.js'

describe('Alert Actions', () => {
  it('should create an action with the alert message', () => {
    const message = 'Test alert message'
    const expectedAction = {
      type: ALERT_POP,
      message
    }
    expect(alert(message)).to.deep.equal(expectedAction)
  })
}) 