import React from 'react';
import './Website/web.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Loading...</p>
      <p>Fetching Data Please Wait!</p>
    </div>
  );
};

export default Loading;
