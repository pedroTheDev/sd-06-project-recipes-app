import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import Foods from './pages/Foods';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/comidas" component={Foods} />
      </Switch>
    </LoginProvider>
  );
}

export default App;
