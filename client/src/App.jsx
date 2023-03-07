import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';

function App() {
  const [apiResponse, setApiResponse] = useState("")
  useEffect(() => {
    fetch("http://localhost:9000/")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setApiResponse(res.message)});
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p className="App-intro">Respuesta API: {apiResponse ?? "Hola"}</p>
      </header>
    </div>
  );
}

export default App;
