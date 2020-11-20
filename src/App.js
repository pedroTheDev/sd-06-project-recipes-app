import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Provider
import RecipesProvider from './provider/RecipesProvider';

// Pages
import Login from './pages/Login';
import MainFood from './pages/MainFood';
import MainDrink from './pages/MainDrink';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodOrigin from './pages/ExploreFoodOrigin';
import MadeRecipes from './pages/MadeRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <RecipesProvider>
          <Route exact path="/" component={Login} />
        </RecipesProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
