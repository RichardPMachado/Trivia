import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Configuracao from './pages/Configuracao';
import feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

// import logo from './trivia.png';
// import './App.css';

function App() {
  return (
    <Switch>
      {/* <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header> */}
      <Route component={ Login } path="/" exact />
      <Route component={ Game } path="/game-page" exact />
      <Route component={ Configuracao } path="/config" exact />
      <Route component={ feedback } path="/feedback" exact />
      <Route component={ Ranking } path="/ranking" exact />

    </Switch>
  );
}

export default App;
