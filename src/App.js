import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import Drink from './pages/Drink';
import Food from './pages/Food';
import Explore from './pages/Explore';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import ContextProvider from './context/ContextProvider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/bebidas/:id" component={ DrinkDetails } />
          <Route path="/bebidas" component={ Drink } />
          <Route path="/comidas/:id" component={ FoodDetails } />
          <Route path="/comidas" component={ Food } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/explorar" component={ Explore } />
          <Route path="/receitas-feitas" component={ DoneRecipes } />
          <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
