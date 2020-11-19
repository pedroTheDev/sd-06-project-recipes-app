import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Comidas from './Comidas';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/comidas" component={Comidas} />
        {/* <Route path="/bebidas" component={}/>
        <Route path="/comidas/:id" component={}/>
        <Route path="/bebidas/:id" component={}/>
        <Route path="/comidas/:id/in-progress" component={}/>
        <Route path="/bebidas/:id/in-progress" component={}/>
        <Route path="/explorar" component={}/>
        <Route path="/explorar/comidas" component={}/>
        <Route path="/explorar/bebidas" component={}/>
        <Route path="/explorar/comidas/ingredientes" component={}/>
        <Route path="/explorar/bebidas/ingredientes" component={}/>
        <Route path="//explorar/comidas/area" component={}/>
        <Route path="/perfil" component={}/>
        <Route path="/receitas-feitas" component={}/>
        <Route path="/receitas-favoritas" component={}/> */}
      </Switch>
    </BrowserRouter>
  );
}
