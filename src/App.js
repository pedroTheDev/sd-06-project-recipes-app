import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Perfil from './pages/Perfil';
import favoriteFoods from './pages/FavoriteFoods';
import recipesMade from './pages/RecipesMade';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreRecipes from './pages/ExploreRecipes';
import ExploreByIngredients from './pages/ExploreByIngredients';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/receitas-feitas" component={ recipesMade } />
        <Route path="/receitas-favoritas" component={ favoriteFoods } />
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/:id" component={ ExploreRecipes } />
        <Route path="/explorar/:id/ingredientes" component={ ExploreByIngredients } />
      </Switch>
    </Provider>
  );
}

export default App;
