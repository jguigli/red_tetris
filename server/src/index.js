import fs  from 'fs'
import debug from 'debug'
import Game from './game'
import Player from './player'

const logerror = debug('tetris:error')
  , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const {host, port} = params
  const handler = (req, res) => {
    if (req.url === '/bundle.js') {
      fs.readFile(__dirname + '/../../build/bundle.js', (err, data) => {
        if (err) {
          logerror(err)
          res.writeHead(500)
          return res.end('Error loading bundle.js')
        }
        res.writeHead(200, {'Content-Type': 'application/javascript'})
        res.end(data)
      })
    } else {
      fs.readFile(__dirname + '/../../index.html', (err, data) => {
        if (err) {
          logerror(err)
          res.writeHead(500)
          return res.end('Error loading index.html')
        }
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data)
      })
    }
  }

  app.on('request', handler)

  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const gameManager = new Game();

const initEngine = io => {
  io.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    let currentRoom = null

    socket.on('action', (action) => {
      loginfo(`Action received: ${action.type}`)
      switch(action.type)
      {
        case 'server/ping':
          socket.emit('action', {type: 'pong'})
          break

        case 'server/join_room':
          currentRoom = action.roomId
          if (!gameManager.gameisOn(currentRoom))
          {
            socket.join(currentRoom)
            socket.emit('game_is_reachable', true)
            if (gameManager.rooms[currentRoom] == undefined)
              gameManager.createGame(currentRoom)
            gameManager.addPlayer(currentRoom, socket, action.playerName)
            io.to(currentRoom).emit('game_update', gameManager.getGameState(currentRoom))
            loginfo(`Player ${socket.id} joined room ${currentRoom}`)
          }
          else
            socket.emit('game_is_reachable', false)
          break
        
        case 'server/leave_room':
          if (currentRoom)
          {
            gameManager.removePlayer(currentRoom, socket)
            socket.leave(currentRoom)
            io.to(currentRoom).emit('game_update', gameManager.getGameState(currentRoom))
            // currentRoom = null
            loginfo(`Player ${socket.id} left their game`)
          }
          break

        case 'server/start_game':
          if (currentRoom)
          {
            if (gameManager.startGame(currentRoom, socket))
            {
              io.to(currentRoom).emit('game_update', gameManager.getGameState(currentRoom))
              loginfo(`Game started in room ${currentRoom}`)

              const gameInterval = setInterval(() => {
                const state = gameManager.getGameState(currentRoom)
                
                if (!state || state.gameOver)
                {
                  clearInterval(gameInterval)
                  if (state)
                  {
                    if (state.gameOver)
                      io.to(currentRoom).emit('game_update', state)
                  }
                  return
                }
                
                gameManager.updateGame(currentRoom)
                
                io.to(currentRoom).emit('game_update', state)
              }, 1000)
            }
          }
          break
        
        case 'server/restart_game':
          if (currentRoom)
          {
            if (gameManager.restartGame(currentRoom, socket))
            {
              io.to(currentRoom).emit('game_update', gameManager.getGameState(currentRoom))
              loginfo(`Game restarted in room ${currentRoom}`)
  
              const gameInterval = setInterval(() => {
                const state = gameManager.getGameState(currentRoom)
                
                if (!state || state.gameOver)
                {
                  clearInterval(gameInterval)
                  if (state)
                  {
                    if (state.gameOver)
                      io.to(currentRoom).emit('game_update', state)
                  }
                  return
                }
                
                gameManager.updateGame(currentRoom)
                
                io.to(currentRoom).emit('game_update', state)
              }, 1000)
            }
          }
          break
        
        case 'server/player_move':
          if (currentRoom)
          {
            gameManager.handlePlayerMove(currentRoom, socket, action.move)
            io.to(currentRoom).emit('game_update', gameManager.getGameState(currentRoom))
            // loginfo(`Player make a move ${action.move}`)
          }
          break
        
        default:
          break
      }
    })

    socket.on('disconnect', () => {
      loginfo(`Socket disconnected: ${socket.id}`)
      
      if (currentRoom) {
        gameManager.removePlayer(currentRoom, socket)
        socket.leave(currentRoom)
        io.to(currentRoom).emit('game_update', gameManager.getGameState(currentRoom))
        currentRoom = null
      }
    })
  })
}

export function create(params){
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{
      const io = require('socket.io')(app)
      const stop = (cb) => {
        io.close()
        app.close( () => {
          app.unref()
        })
        loginfo(`Engine stopped.`)
        cb()
      }

      initEngine(io)
      resolve({stop})
    })
  })
  return promise
}
