import React from 'react';
import { useHistory } from 'react-router-dom';

const ErrorPage = () => {
  const history = useHistory();
    
  return (
    <div className="error-container">
      <h1>Error: Invalid URL</h1>
      <p>Please use the format: /room_id/player_name</p>
      <p>Example: http:localhost:8080/1/player1</p>

      <button onClick={() => {history.push('/');}} className="go-home-button">
        Go to Home
      </button>
    </div>
  )
};

export default ErrorPage;