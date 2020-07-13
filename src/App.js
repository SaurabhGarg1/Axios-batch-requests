import React from 'react';
import logo from './logo.svg';
import './App.css';
import { runTest } from './test';

function App() {
  return (
    <div className="App">
      <input type="button" onClick={runTest} value="initialise test" />
    </div>
  );
}

export default App;
