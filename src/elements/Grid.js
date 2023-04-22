import "./Grid.css"
import React from 'react';
import Navbar from './Navbar';

const Grid = ({ children }) => {
  return (
    <div className="grid-container">
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Grid;