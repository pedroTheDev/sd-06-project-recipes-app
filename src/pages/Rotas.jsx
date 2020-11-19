import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact to="/" component={Login} />
        {/* <Route to="/comidas" component={}/>
        <Route to="/bebidas" component={}/>
        <Route to="/comidas/:id" component={}/>
        <Route to="/bebidas/:id" component={}/>
        <Route to="/comidas/:id/in-progress" component={}/>
        <Route to="/bebidas/:id/in-progress" component={}/>
        <Route to="/explorar" component={}/>
        <Route to="/explorar/comidas" component={}/>
        <Route to="/explorar/bebidas" component={}/>
        <Route to="/explorar/comidas/ingredientes" component={}/>
        <Route to="/explorar/bebidas/ingredientes" component={}/>
        <Route to="//explorar/comidas/area" component={}/>
        <Route to="/perfil" component={}/>
        <Route to="/receitas-feitas" component={}/>
        <Route to="/receitas-favoritas" component={}/> */}
      </Switch>
    </BrowserRouter>
  );
}
