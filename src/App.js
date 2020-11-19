import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import MainFood from './pages/MainFood';
import MainDrink from './pages/MainDrink';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/comidas" component={MainFood} />
        <Route exact path="/bebidas" component={MainDrink} />
        <Route exact path="/perfil" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
