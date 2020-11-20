import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login, Foods, Drinks, Explore, Profile, DoneRecipes, FavoriteRecipes,
} from './pages';
import './App.css';

function App() {
  return (
    <div className="master-container">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/comidas" component={Foods} />
        <Route path="/bebidas" component={Drinks} />
        <Route path="/explorar" component={Explore} />
        <Route path="/perfil" component={Profile} />
        <Route path="/receitas-feitas" component={DoneRecipes} />
        <Route path="/receitas-favoritas" component={FavoriteRecipes} />
      </Switch>
    </div>
  );
}

export default App;
