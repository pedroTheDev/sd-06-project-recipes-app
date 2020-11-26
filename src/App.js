import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Perfil from './pages/Perfil';
import favoriteFoods from './pages/FavoriteFoods';
import RecipesMade from './pages/RecipesMade';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import Explore from './pages/Explore';
import ExploreRecipes from './pages/ExploreRecipes';
import ExploreByIngredients from './pages/ExploreByIngredients';
import ExploreByOrigin from './pages/ExploreByOrigin';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/receitas-feitas" component={ RecipesMade } />
        <Route path="/receitas-favoritas" component={ favoriteFoods } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route path="/comidas/:idRecipe" component={ RecipeDetails } />
        <Route path="/bebidas/:idRecipe" component={ RecipeDetails } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/:id" component={ ExploreRecipes } />
        <Route path="/explorar/:id/ingredientes" component={ ExploreByIngredients } />
        <Route path="/explorar/:id/area" component={ ExploreByOrigin } />
      </Switch>
    </Provider>
  );
}

export default App;
