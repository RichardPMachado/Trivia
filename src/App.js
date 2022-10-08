import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Configuracao from './pages/Configuracao';
import GamePage from './pages/GamePage';

// import logo from './trivia.png';
// import './App.css';

export default function App() {
  return (
    <Switch>
      {/* <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header> */}
      <Route component={ Login } path="/" exact />
      <Route component={ GamePage } path="/game-page" exact />
      <Route component={ Configuracao } path="/config" exact />
    </Switch>
  );
}
