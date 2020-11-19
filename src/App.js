import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import MainFood from './pages/MainFood';
import MainDrink from './pages/MainDrink';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/comidas" component={MainFood} />
        <Route exact path="/bebidas" component={MainDrink} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
