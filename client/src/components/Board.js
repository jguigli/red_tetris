import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'


const Cell = ({ color }) => (
  <div className="cell" style={{ backgroundColor: color || 'black' }}></div>
)

const SpecterGrid = ({ otherPlayers }) => {
  return (
    <div className="specter-container">
      <h3>Online players:</h3>
      {Object.values(otherPlayers).map((player) => (
        <div key={player.name} className="specter">
          <h4>{player.name}</h4>
          <div className="specter-grid">
            {player.spectrum.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, cellIndex) => (
                  <Cell key={`${rowIndex}-${cellIndex}`} color={cell || 'transparent'} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Grid = ({ board, currentPiece, gameOn }) => {
  let tempBoard = board.map(row => [...row]);

  if (currentPiece && gameOn)
  {
    currentPiece.shape.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell !== 0) {
          tempBoard[currentPiece.y + rowIndex][currentPiece.x + cellIndex] = currentPiece.color;
        }
      });
    });
  }

  return (
    <div className="grid">
      {tempBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <Cell key={`${rowIndex}-${cellIndex}`} color={cell || 'transparent'} />
          ))}
        </div>
      ))}
    </div>
  );
};


const Preview = ({ nextPiece }) => (
  <div className="preview">
    <h3>Next:</h3>
    <div className="preview-grid">
      {nextPiece && nextPiece.shape.map((row, rowIndex) => (
        <div key={rowIndex} className="preview-row">
          {row.map((cell, cellIndex) => (
            <Cell key={`${rowIndex}-${cellIndex}`} color={cell ? nextPiece.color : 'transparent'} />
          ))}
        </div>
      ))}
    </div>
  </div>
)


const GameInfo = ({ level, lines }) => (
  <div className="game-info">
    <div className="info-item">
      <h3>Level:</h3>
      <div className="info-value">{level}</div>
    </div>
    <div className="info-item">
      <h3>Lines:</h3>
      <div className="info-value">{lines}</div>
    </div>
  </div>
)


export const TetrisBoard = ({ board, nextPiece, currentPiece, level, lines, gameOn, otherPlayers }) => {
  return (
    <div className="tetris-container">
      <Fragment>
        <div className="left-panel">
          <SpecterGrid otherPlayers={otherPlayers} />
        </div>
        <div className="center-panel">
          <Grid board={board} currentPiece={currentPiece} gameOn={gameOn} />
        </div>
        <div className="right-panel">
          <Preview nextPiece={nextPiece} />
          <GameInfo level={level} lines={lines} />
        </div>
      </Fragment>
    </div>
  )
}

const mapStateToProps = (state) => ({
  board: state.game ? state.game.board : Array(20).fill(Array(10).fill(null)),
  currentPiece: state.game ? state.game.currentPiece : null,
  nextPiece: state.game ? state.game.nextPiece : null,
  level: state.game ? state.game.level : 1,
  lines: state.game ? state.game.lines : 0,
  gameOn: state.game ? state.game.gameOn : false,
  otherPlayers: state.game ? state.game.otherPlayers : null,
})

export default connect(mapStateToProps)(TetrisBoard) 