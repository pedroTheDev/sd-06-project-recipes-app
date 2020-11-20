import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Bebidas from './pages/Bebidas';
import Comidas from './pages/Comidas';
import Detalhes from './pages/Detalhes';
import Explorar from './pages/Explorar';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/comidas" component={Comidas} />
        <Route path="/bebidas" component={Bebidas} />
        <Route path="/detalhes" component={Detalhes} />
        <Route path="/explorar" component={Explorar} />
        <Route path="/receitas-feitas" component={ReceitasFeitas} />
        <Route path="/receitas-favoritas" component={ReceitasFavoritas} />
        <Route path="/perfil" component={Perfil} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
