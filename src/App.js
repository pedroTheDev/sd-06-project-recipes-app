import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import Drink from './pages/Drink';
import Food from './pages/Food';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/comidas" component={Food} />
        <Route path="/bebidas" component={Drink} />
        <Route path="/perfil" component={Perfil} />
        <Login />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
