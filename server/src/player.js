class Player
{
  constructor(socket, playerName, isLeader)
  {
    this.socket = socket
    this.name = playerName
    this.board = Array(20).fill(Array(10).fill(0))
    this.currentPiece = null
    this.nextPiece = null
    this.level = 1
    this.lines = 0
    this.penalities = 0
    this.isAlive = true
    this.isLeader = isLeader
    this.currentPieceIndex = 0
  }
}

export default Player;