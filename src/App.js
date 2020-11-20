import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import {
  Login, Bebidas, Comidas, Explorar, Perfil, ReceitasFavoritas, ReceitasFeitas,
} from './pages';
import store from './redux/store';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/bebidas/:id" component={ Bebidas } />
          <Route exact path="/bebidas/:id/in-progress" component={ Bebidas } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/comidas/:id" component={ Comidas } />
          <Route exact path="/comidas/:id/in-progress" component={ Comidas } />
          <Route exact path="/explorar" component={ Explorar } />

          <Route exact path="/explorar/comidas" component={ Explorar } />
          <Route exact path="/explorar/bebidas" component={ Explorar } />
          <Route exact path="/explorar/comidas/ingredientes" component={ Explorar } />
          <Route exact path="/explorar/bebidas/ingredientes" component={ Explorar } />
          <Route exact path="/explorar/comidas/area" component={ Explorar } />

          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/perfil" component={ Perfil } />

        </Switch>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
