// src/App.js

import React from 'react';
import Weather from './components/Weather';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Weather />
      <Analytics />
    </div>
  );
}

export default App;