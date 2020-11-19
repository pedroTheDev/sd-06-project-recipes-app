import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/comidas" component={Foods} />
        <Route path="/perfil" component={Perfil} />
      </Switch>
    </Provider>
  );
}

export default App;
