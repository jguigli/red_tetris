import { expect } from 'chai'
import { ping } from '../../src/actions/server.js'

describe('Server Actions', () => {
  it('should create an action to ping the server', () => {
    const expectedAction = {
      type: 'server/ping'
    }
    expect(ping()).to.deep.equal(expectedAction)
  })
}) 