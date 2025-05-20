
class Piece
{
  constructor(type, x, y)
  {
    if (!Piece.pieces[type])
      throw new Error('Invalid piece type');

    const { shape, color, number } = Piece.pieces[type];

    this.shape = shape.map(row => [...row]);
    this.color = color;
    this.number = number;
    this.x = x
    this.y = y
  }

  rotate()
  {
    this.shape = this.shape[0].map((_, index) =>
      this.shape.map(row => row[index]).reverse()
    );
  }

  static getKeys()
  {
    return Object.keys(Piece.pieces)
  }

  static pieces = {
    I: {
      shape: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      color: "cyan",
      number: 1
    },
    J: {
      shape: [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
      ],
      color: "blue",
      number: 2
    },
    L: {
      shape: [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
      ],
      color: "orange",
      number: 3
    },
    O: {
      shape: [
        [4, 4],
        [4, 4]
      ],
      color: "yellow",
      number: 4
    },
    S: {
      shape: [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
      ],
      color: "green",
      number: 5
    },
    T: {
      shape: [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
      ],
      color: "purple",
      number: 6
    },
    Z: {
      shape: [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
      ],
      color: "red",
      number: 7
    }
  }
}

export default Piece;