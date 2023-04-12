import "./App.css";
// src/App.js
import React from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import Grid from './components/Grid';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
      <Grid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </Grid>
  );
};

export default App;
