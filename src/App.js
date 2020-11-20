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
          <Route exact path="/comidas" component={MainFood} />
          <Route exact path="/bebidas" component={MainDrink} />
          <Route exact path="/perfil" component={Profile} />
          <Route exact path="/explorar" component={Explore} />
          <Route exact path="/explorar/comidas" component={ExploreFood} />
          <Route exact path="/explorar/bebidas" component={ExploreDrink} />
          <Route exact path="/explorar/comidas/ingredientes" component={ExploreFoodIngredients} />
          <Route exact path="/explorar/bebidas/ingredientes" component={ExploreDrinkIngredients} />
          <Route exact path="/explorar/comidas/area" component={ExploreFoodOrigin} />
          <Route exact path="/receitas-feitas" component={MadeRecipes} />
          <Route exact path="/receitas-favoritas" component={FavoritesRecipes} />
        </RecipesProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
