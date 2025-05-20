import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import TetrisBoard from './Board.js'
import './styles.css'
import { joinGameServer, leaveGameServer, setIsNew, gameIsReachable } from '../actions/game.js'

const Game = ({ isReachable, gameOn, gameOver, isLeader, isAlive, isNew, dispatch }) => {
  const { roomid, playername } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    const isValidRoomId = Number.isInteger(Number(roomid));
    if (!isValidRoomId)
      navigate('/error')

    if (roomid && playername)
      dispatch(joinGameServer(playername, roomid));
    
    return () => {
      dispatch(leaveGameServer());
      dispatch(setIsNew(true))
    };
  }, [ roomid, playername, dispatch, history]);

  useEffect(() => {
    if (!isReachable)
      navigate('/not_reachable')
    
    return () => {
      dispatch(gameIsReachable(true))
    };
  }, [isReachable, dispatch, history]);
  
  return (
    <div className="game-wrapper">
      <div className="game-info-header">
        <h2>Room: {roomid}</h2>
        <h3>Player: {playername}</h3>
        {isAlive && gameOver && !isNew && <p className="game-over win">Game OVER : You win</p>}
        {!isAlive && <p className="game-over lose">Game OVER : You lose</p>}
        {!gameOn ? isLeader ? <p className="game-status leader">Press Enter to launch the game</p> : <p className="game-status waiting">Waiting for the leader to start the game</p> : null}
      </div>
      <TetrisBoard />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isReachable: state.game ? state.game.isReachable : true,
  gameOn: state.game ? state.game.gameOn : false,
  gameOver: state.game ? state.game.gameOver : false,
  isLeader: state.game ? state.game.isLeader : false,
  isAlive: state.game ? state.game.isAlive : false,
  isNew: state.game ? state.game.isNew : true,
});

export default connect(mapStateToProps)(Game);