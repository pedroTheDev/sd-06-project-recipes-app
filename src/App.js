import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Comidas,
  Bebidas,
  ComidasDetails,
  BebidasDetails,
  ComidasInProgress,
  BebidasInProgress,
  Explorar,
  ExplorarComidas,
  ExplorarBebidas,
  ExplorarComidasIngredientes,
  ExplorarBebidasIngredientes,
  ExplorarComidasArea,
  Perfil,
  ReceitasFeitas,
  ReceitasFavoritas,
} from './Pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/comidas" component={Comidas} />
      <Route exact path="/bebidas" component={Bebidas} />
      <Route path="/comidas/:id" render={(props) => <ComidasDetails {...props} />} />
      <Route path="/bebidas/:id" render={(props) => <BebidasDetails {...props} />} />
      <Route
        path="/comidas/:id/in-progress"
        render={(props) => <ComidasInProgress {...props} />}
      />
      <Route
        path="/bebidas/:id/in-progress"
        render={(props) => <BebidasInProgress {...props} />}
      />
      <Route path="/explorar/comidas/area" component={ExplorarComidasArea} />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ExplorarComidasIngredientes}
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ExplorarBebidasIngredientes}
      />
      <Route path="/explorar/comidas" component={ExplorarComidas} />
      <Route path="/explorar/bebidas" component={ExplorarBebidas} />
      <Route path="/explorar" component={Explorar} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/receitas-feitas" component={ReceitasFeitas} />
      <Route path="/receitas-favoritas" component={ReceitasFavoritas} />
    </Switch>
  );
}

export default App;
