import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Comidas from './pages/Comidas';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/comidas" component={ Comidas } />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
