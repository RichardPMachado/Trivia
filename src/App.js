import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Configuracao from './pages/Configuracao';
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
      <Route exact path="/" component={ Login } />
      <Route path="/config" component={ Configuracao } />
    </Switch>
  );
}
