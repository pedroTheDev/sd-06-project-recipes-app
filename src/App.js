import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './Context/Provider';

import Login from './Pages/Login';
import Comidas from './Pages/Comidas';
import Bebidas from './Pages/Bebidas';
import Perfil from './Pages/Perfil';
import DetalhesComidas from './Pages/DetalhesComidas';
import DetalhesBebidas from './Pages/DetalhesBebidas';
import ProcessoComida from './Pages/ProcessoComida';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/comidas" component={Comidas} />
          <Route path="/bebidas" component={Bebidas} />
          <Route path="/perfil" component={Perfil} />
          <Route path="/detalhes-comidas" component={DetalhesComidas} />
          <Route path="/detalhes-bebidas" component={DetalhesBebidas} />
          <Route path="/processo-comida" component={ProcessoComida} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
