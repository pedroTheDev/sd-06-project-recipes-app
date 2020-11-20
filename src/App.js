import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ReceitasComidas from './pages/receitasComidas';

import './App.css';
import Login from './pages/login';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ ReceitasComidas } />
      </Switch>
    </div>
  );
}

export default App;
