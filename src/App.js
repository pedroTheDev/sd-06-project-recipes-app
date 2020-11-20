import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Explore from './pages/Explore';
import Perfil from './pages/Perfil';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/comidas" component={Comidas} />
          <Route exact path="/bebidas" component={Bebidas} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/perfil" component={Perfil} />

        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
