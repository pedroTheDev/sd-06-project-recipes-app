import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import RecipesContext from './context/RecipesContext';
import Foods from './pages/Foods';

function App() {
  return (
    <LoginProvider>
      <RecipesContext>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/comidas" component={Foods} />
        </Switch>
      </RecipesContext>
    </LoginProvider>
  );
}

export default App;
