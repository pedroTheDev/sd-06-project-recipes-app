import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, NotFound, Comidas, Bebidas, Explorar,
  ExplorarComidas, ExplorarBebidas, ComidasPorIngrediente,
  ComidasPorLocalOrigem, BebidasPorIngrediente, DetalhesBebida,
  DetalhesComida, ProcessoBebida, ProcessoComida, Profile,
  ReceitasFavoritas, ReceitasFeitas } from '../pages';

export default function Routers() {
  return (
    <Switch>
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/comidas/{id-da-receita}" component={ DetalhesComida } />
      <Route path="/bebidas/{id-da-receita}" component={ DetalhesBebida } />
      <Route path="/comidas/{id-da-receita}/in-progress" component={ ProcessoComida } />
      <Route path="/bebidas/{id-da-receita}/in-progress" component={ ProcessoBebida } />
      <Route path="/explorar" component={ Explorar } />
      <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route path="/explorar/comidas/ingredientes" component={ ComidasPorIngrediente } />
      <Route path="/explorar/bebidas/ingredientes" component={ BebidasPorIngrediente } />
      <Route path="/explorar/comidas/area" component={ ComidasPorLocalOrigem } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route component={ NotFound } />
    </Switch>
  );
}
