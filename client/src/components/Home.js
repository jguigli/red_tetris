import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

const Home = () => {
    const [playerName, setPlayerName] = useState(`Player_${Math.random().toString(36).substring(2, 8)}`);
    const rooms = Array.from({ length: 50 }, (_, index) => index + 1);
    const history = useHistory();
  
    return (
      <div className="home-container">
        <h1>Red Tetris</h1>

        <p>Edit your player name</p>
        <input
            type="text"
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="pseudo-input"
        />
  
        <h2>Join a Room</h2>
        <div className="rooms-container">
          {rooms.map((roomId) => (
            <div key={roomId} className="room-card">
              <button 
                onClick={() => history.push(`/${roomId}/${playerName}`)} 
                className="room-link"
              >
                Room {roomId}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  };

export default Home;