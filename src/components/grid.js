// src/components/Grid.js
import React from 'react';
import Navbar from './Navbar';
import './Grid.css';

const Grid = ({ children }) => {
  return (
    <div className="grid-container">
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Grid;