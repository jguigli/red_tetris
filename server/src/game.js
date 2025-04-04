import Piece from './piece'
import Player from './player'

class Game
{
  constructor()
  {
    this.rooms = {};
  }

  createGame(roomId)
  {
    this.rooms[roomId] = {
      players: {},
      gameOn: false,
      gameOver: false,
      pieceQueue: this.generateNewSequence(),
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  addPlayer(roomId, socket, playerName)
  {
    if (!this.rooms[roomId])
      return

    this.rooms[roomId].players[socket.id] = new Player (
      socket,
      playerName,
      Object.keys(this.rooms[roomId].players).length === 0 ? true : false
    )
    this.rooms[roomId].players[socket.id].nextPiece = this.getNextPiece(roomId, socket.id)
  }

  removePlayer(roomId, socket)
  {
    if (!this.rooms[roomId])
      return

    if (!this.rooms[roomId].players[socket.id])
      return
    
    const { [socket.id]: removedPlayer, ...remainingPlayers } = this.rooms[roomId].players;
    this.rooms[roomId].players = remainingPlayers;

    if (removedPlayer.isLeader && Object.keys(remainingPlayers).length > 0)
    {
      const remainingPlayerIds = Object.keys(remainingPlayers);
      if (remainingPlayerIds.length > 0)
        this.rooms[roomId].players[remainingPlayerIds[0]].isLeader = true;
    }

    if (Object.keys(this.rooms[roomId].players).length === 1 && this.rooms[roomId].gameOn)
    {
      this.rooms[roomId].gameOn = false
      this.rooms[roomId].gameOver = true
    }

    if (Object.keys(this.rooms[roomId].players).length === 0)
      delete this.rooms[roomId]
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  startGame(roomId, socket)
  {
    if (!this.rooms[roomId])
      return false

    if (!this.rooms[roomId].players[socket.id])
      return false

    if (!this.rooms[roomId].players[socket.id].isLeader)
      return false

    if (this.rooms[roomId].gameOn)
      return false

    Object.values(this.rooms[roomId].players).forEach(player => {
      player.currentPiece = player.nextPiece
      player.nextPiece = this.getNextPiece(roomId, player.socket.id)
    });

    this.rooms[roomId].gameOn = true
    return true
  }

  gameOver(roomId)
  {
    if (!this.rooms[roomId])
      return

    this.rooms[roomId].gameOn = false
    this.rooms[roomId].gameOver = true
  }

  restartGame(roomId, socket)
  {
    if (!this.rooms[roomId])
      return false

    if (!this.rooms[roomId].players[socket.id])
      return false

    if (!this.rooms[roomId].players[socket.id].isLeader)
      return false

    this.rooms[roomId].gameOn = true
    this.rooms[roomId].gameOver = false
    this.rooms[roomId].pieceQueue = this.generateNewSequence()

    Object.values(this.rooms[roomId].players).forEach(player => {
      player.lines = 0
      player.level = 1
      player.penalities = 0
      player.isAlive = true
      player.board = Array(20).fill(Array(10).fill(0))
      player.currentPieceIndex = 0
      player.currentPiece = this.getNextPiece(roomId, player.socket.id) //////////////////////
      player.nextPiece = this.getNextPiece(roomId, player.socket.id)
    });
    return true
  }

  gameisOn(roomId)
  {
    if (!this.rooms[roomId])
      return false

    return this.rooms[roomId].gameOn
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  getNextPiece(roomId, playerId)
  { 
    const player = this.rooms[roomId].players[playerId];
    
    if (player.currentPieceIndex >= this.rooms[roomId].pieceQueue.length)
    {
      const newSequence = this.generateNewSequence();
      this.rooms[roomId].pieceQueue = this.rooms[roomId].pieceQueue.concat(newSequence);
    }

    const currentPieceType = this.rooms[roomId].pieceQueue[player.currentPieceIndex];
    this.rooms[roomId].players[playerId].currentPieceIndex += 1
    
    return new Piece(currentPieceType, 3, 0);
  }
  
  generateNewSequence()
  {
    const baseSequence = Piece.getKeys()
    
    const result = [];
    
    for (let row = 1; row < 3; row++)
    {
      const shuffled = [...baseSequence];
      
      for (let i = shuffled.length - 1; i > 0; i--)
      {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      result.push(...shuffled);
    }
    
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  updateGame(roomId)
  {
    if (!this.rooms[roomId])
      return

    Object.values(this.rooms[roomId].players).forEach(player => {
      if (player.isAlive)
      {
        const {newBoard, newLines} = this.destroyFilledLine(roomId, player.socket.id, player.board, player.lines)
        player.board = newBoard
        player.lines = newLines

        if (this.canMoveDown(player.currentPiece, player.board))
          player.currentPiece.y += 1;
        else
        {
          if (this.checkPlayerGameOver(player.currentPiece, player.board))
          {
            player.isAlive = false
          }
          player.board = this.mergePieceToBoard(player.currentPiece, player.board);
          
          player.currentPiece = player.nextPiece;
          player.nextPiece = this.getNextPiece(roomId, player.socket.id);
          player.level +=1
        }
      }

    });
    
    this.createPenaltyLine(roomId)

    if (this.checkGameOver(roomId))
    {
      this.rooms[roomId].gameOver = true
      this.rooms[roomId].gameOn = false
    }
    
  }

  mergePieceToBoard = (piece, board) => {
    const newBoard = board.map(row => [...row]);
    
    piece.shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell)
          newBoard[piece.y + rowIndex][piece.x + colIndex] = piece.color;
      });
    });
  
    return newBoard;
  };

  checkPlayerGameOver(piece, board)
  {
    for (let row = 0; row < piece.shape.length; row++)
    {
      for (let col = 0; col < piece.shape[row].length; col++)
      {
        const x = piece.x + col;
        const y = piece.y + row;

        if (piece.y == 0 && board[y][x] !== 0)
          return true;
      }
    }
    return false
  }

  checkGameOver(roomId)
  {
    let countPlayerAlives = 0
    Object.values(this.rooms[roomId].players).forEach(player => {
      if (player.isAlive)
        countPlayerAlives +=1
    });
    if (Object.keys(this.rooms[roomId].players).length > 1)
      return countPlayerAlives <= 1
    else
      return countPlayerAlives < 1
  }

  destroyFilledLine(roomId, socketId, board, lines)
  {
    let penalityOtherPlayers = 0
    let newLines = lines
    const emptyRow = Array(board[0].length).fill(0)
    const newBoard = board.filter(row => {
      const isFull = row.every(cell => cell !== 0);
      const isAllTen = row.every(cell => cell === "white");
      return !isFull || isAllTen;
    });
    
    while (newBoard.length < board.length)
    {
      newBoard.unshift([...emptyRow])
      newLines +=1
      penalityOtherPlayers +=1
    }
    
    if (penalityOtherPlayers)
    {
      const { [socketId]: myself, ...remainingPlayers } = this.rooms[roomId].players;
      Object.values(remainingPlayers).forEach(player => {
        player.penalities += penalityOtherPlayers
      });
    }
    
    return { newBoard, newLines }
  }

  createPenaltyLine(roomId)
  {
    Object.values(this.rooms[roomId].players).forEach(player => {
      if (player.isAlive)
      {
        for (let index = 0; index < player.penalities; index++) {
          player.board[player.board.length - index - 1] = new Array(player.board[0].length).fill("white");
        }
      }
    });
  }

  createSpecter(board)
  {
    console.table(board)
    if (!board)
      return Array(20).fill(Array(10).fill(0))
    
    const specter = Array.from({ length: 20 }, () => Array(10).fill(0));

    for (let col = 0; col < specter[0].length; col++)
    {
      for (let row = 0; row < specter.length; row++)
      {
        if (board[row][col] !== 0)
        {
          console.log(row)
          console.log(col)
          specter[row][col] = "white";
          break;
        }
      }
    }
    console.table(specter)
    
    return specter;
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  getGameState(roomId)
  {
    if (!this.rooms[roomId])
      return

    const gameState = {
      gameOn: this.rooms[roomId].gameOn,
      gameOver: this.rooms[roomId].gameOver,
      players: {}
    }

    Object.values(this.rooms[roomId].players).forEach(player => {
      gameState.players[player.socket.id] = {
        board: this.rooms[roomId].players[player.socket.id].board,
        spectrum: this.createSpecter(this.rooms[roomId].players[player.socket.id].board),
        level: this.rooms[roomId].players[player.socket.id].level,
        lines: this.rooms[roomId].players[player.socket.id].lines,
        penalities: this.rooms[roomId].players[player.socket.id].penalities,
        currentPiece: this.rooms[roomId].players[player.socket.id].currentPiece,
        nextPiece: this.rooms[roomId].players[player.socket.id].nextPiece,
        isAlive: this.rooms[roomId].players[player.socket.id].isAlive,
        isLeader: this.rooms[roomId].players[player.socket.id].isLeader,
        name: this.rooms[roomId].players[player.socket.id].name
      };
    });
    // console.log(gameState)
    return gameState
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  handlePlayerMove(roomId, socket, move)
  {
    if (!this.rooms[roomId])
      return

    if (!this.rooms[roomId].players[socket.id])
      return

    if (!this.rooms[roomId].players[socket.id].isAlive)
      return

    if (!this.rooms[roomId].gameOn || this.rooms[roomId].gameOver)
      return

    const currentPiece = this.rooms[roomId].players[socket.id].currentPiece
    const board = this.rooms[roomId].players[socket.id].board
    const player = this.rooms[roomId].players[socket.id]

    switch (move) {
      case 'MOVE_LEFT':
        if (this.canMoveLeft(currentPiece, board))
          currentPiece.x -=1
        break;

      case 'MOVE_RIGHT':
        if (this.canMoveRight(currentPiece, board))
          currentPiece.x +=1
        break;

      case 'MOVE_DOWN':
        if (this.canMoveDown(currentPiece, board))
          currentPiece.y +=1
        else
        {
          if (this.checkPlayerGameOver(currentPiece, board))
          {
            player.isAlive = false
            if (this.checkGameOver(roomId))
            {
              this.rooms[roomId].gameOver = true
              this.rooms[roomId].gameOn = false
            }
          }
          player.board = this.mergePieceToBoard(currentPiece, board);
          player.currentPiece = player.nextPiece;
          player.nextPiece = this.getNextPiece(roomId, socket.id);
          player.level +=1
        }
        break;

      case 'ROTATE':
        if (this.canRotate(currentPiece, board))
          currentPiece.rotate()
        break;

      case 'DROP':
        while (this.canMoveDown(currentPiece, board))
          player.currentPiece.y += 1;

        if (this.checkPlayerGameOver(currentPiece, board))
        {
          player.isAlive = false
          if (this.checkGameOver(roomId))
          {
            this.rooms[roomId].gameOver = true
            this.rooms[roomId].gameOn = false
          }
        }
        player.board = this.mergePieceToBoard(currentPiece, board);
        player.currentPiece = player.nextPiece;
        player.nextPiece = this.getNextPiece(roomId, socket.id);
        player.level +=1
        break;
    
      default:
        break;
    }
  }

  canMoveLeft(piece, board)
  {
    for (let row = 0; row < piece.shape.length; row++)
    {
      for (let col = 0; col < piece.shape[row].length; col++)
      {
        if (piece.shape[row][col] !== 0)
        {
          const y = piece.y + row;
          const x = piece.x + col - 1;
          
          if (x < 0 || (board[y][x] !== 0))
            return false
        }
      }
    }
    return true
  }

  canMoveRight(piece, board)
  {
    for (let row = 0; row < piece.shape.length; row++)
    {
      for (let col = 0; col < piece.shape[row].length; col++)
      {
        if (piece.shape[row][col] !== 0)
        {
          const y = piece.y + row;
          const x = piece.x + col + 1;
          
          if (x > board[0].length || (board[y][x] !== 0))
            return false
        }
      }
    }
    return true
  }

  canMoveDown(piece, board)
  {
    for (let row = 0; row < piece.shape.length; row++)
    {
      for (let col = 0; col < piece.shape[row].length; col++)
      {
        if (piece.shape[row][col] !== 0)
        {
          const y = piece.y + row + 1;
          const x = piece.x + col;
          
          if (y >= board.length || (board[y][x] !== 0))
            return false
        }
      }
    }
    return true
  }

  canRotate(piece, board)
  {
    const pieceRotate = piece.shape[0].map((_, index) => piece.shape.map(row => row[index]).reverse())

    for (let row = 0; row < pieceRotate.length; row++)
    {
      for (let col = 0; col < pieceRotate[row].length; col++)
      {
        if (pieceRotate[row][col] !== 0)
        {
          const y = piece.y + row;
          const x = piece.x + col;
          
          if (x > board[0].length || x < 0 || (board[y][x] !== 0) || y >= board.length || y <= 0)
            return false
        }
      }
    }
    return true
  }
}

export default Game;