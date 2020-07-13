import React from 'react';
import logo from './logo.svg';
import './App.css';
import { runTest } from './test';

function App() {
  return (
    <div className="App">
      <input type="button" onClick={runTest} value="Initialise test" />
    </div>
  );
}

export default App;
