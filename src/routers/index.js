import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  NotFound,
  Comidas,
  Bebidas, Explorar, Profile, DoneRecipes, FavoriteRecipes } from '../pages';

export default function Routers() {
  return (
    <Switch>
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
      {/* <Route path="/comidas/:id" component={ } />
      <Route path="/bebidas/:id" component={ } />
      <Route path="/comidas/:id/in-progress" component={ } />
      <Route path="/bebidas/:id/in-progress" component={ } /> */}
      <Route path="/explorar" component={ Explorar } />
      {/* <Route path="/explorar/comidas" component={ } />
      <Route path="/explorar/bebidas" component={ } />
      <Route path="/explorar/comidas/ingredientes" component={ } />
      <Route path="/explorar/bebidas/ingredientes" component={ } />
      <Route path="/explorar/comidas/area" component={ } /> */}
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route component={ NotFound } />
    </Switch>
  );
}
