import React from 'react';
import { useHistory } from 'react-router-dom';

const GameNotReachable = () => {
  const history = useHistory();
    
  return (
    <div className="not-reachable-container">
      <h1>Game already in progress</h1>
      <p>The game you are trying to join is currently in progress.</p>
      <p>Please wait for the next game to start or try joining later.</p>

      <button onClick={() => history.push('/')} className="go-home-button">
        Go to Home
      </button>
    </div>
  );
};

export default GameNotReachable;
