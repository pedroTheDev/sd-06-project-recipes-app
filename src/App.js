import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Explore from './pages/Explore';
import Perfil from './pages/Perfil';
import ExploreBebidas from './pages/ExploreBebidas';
import ExploreComidas from './pages/ExploreComidas';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/comidas" component={Comidas} />
          <Route exact path="/bebidas" component={Bebidas} />
          <Route exact path="/explorar" component={Explore} />
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="/explorar/comidas" component={ExploreComidas} />
          <Route exact path="/explorar/bebidas" component={ExploreBebidas} />

        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
