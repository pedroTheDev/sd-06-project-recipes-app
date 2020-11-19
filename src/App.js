import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreByArea from './pages/ExploreByArea';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import FavoritesRecipes from './pages/FavoritesRecipes';
import FinishedRecipes from './pages/FinishedRecipes';
import Profile from './pages/Profile';
import Food from './pages/Food';
import Drink from './pages/Drink';
import DrinkDetails from './pages/DrinkDetails';
import FoodDetails from './pages/FoodDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';

function App() {
  return (
    <Switch>
      <Route path="/bebidas/:id/in-progress" component={DrinkInProgress} />
      <Route path="/comidas/:id/in-progress" component={FoodInProgress} />
      <Route path="/bebidas/:id" component={DrinkDetails} />
      <Route path="/comidas/:id" component={FoodDetails} />
      <Route path="/bebidas" component={Drink} />
      <Route path="/comidas" component={Food} />
      <Route path="/explorar/comidas/ingredientes" component={ExploreFoodIngredients} />
      <Route path="/explorar/bebidas/ingredientes" component={ExploreDrinkIngredients} />
      <Route path="/explorar/comidas/area" component={ExploreByArea} />
      <Route path="/explorar/bebidas" component={ExploreDrinks} />
      <Route path="/explorar/comidas" component={ExploreFoods} />
      <Route path="/receitas-favoritas" component={FavoritesRecipes} />
      <Route path="/receitas-feitas" component={FinishedRecipes} />
      <Route path="/perfil" component={Profile} />
      <Route path="/explorar" component={Explore} />
      <Route path="/" component={Login} />
    </Switch>
  );
}

export default App;
