import chai from "chai"
import {startServer, configureStore} from './helpers/server.js'
import params from '../params.js'
import io from 'socket.io-client'

chai.should()

describe('Server test', function(){
  let tetrisServer
  before(cb => startServer(params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('should respond to ping', function(done){
    const socket = io(params.server.url)
    socket.on('connect', () => {
      socket.emit('action', {type: 'server/ping'})
      socket.on('action', (action) => {
        action.type.should.equal('pong')
        socket.disconnect()
        done()
      })
    })
  });
}); 