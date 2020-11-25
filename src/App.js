import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesAppProvider from './context/RecipesAppProvider';
import './App.css';
import Login from './pages/Login/Login';
import RecipesDetails from './pages/RecipesDetails/RecipesDetails';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import DrinksPage from './pages/DrinksPage/DrinksPage';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import InProgress from './pages/InProgress/InProgres';
import MainExploreFood from './pages/MainExplore/MainExploreFood';
import MainExploreDrink from './pages/MainExplore/MainExploreDrink';
import ExploreIngredients from './pages/ExploreIngredients/ExploreIngredients';
import ExploreByArea from './pages/ExploreByArea/ExploreByArea';
import CompletedRecipes from './pages/CompletedRecipes/CompletedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';

function App() {
  return (
    <RecipesAppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ RecipesPage } />
        <Route exact path="/perfil" component={ ProfilePage } />
        <Route exact path="/bebidas" component={ DrinksPage } />
        <Route exact path="/comidas/:id" component={ RecipesDetails } />
        <Route exact path="/bebidas/:id" component={ RecipesDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/explorar" component={ ExplorePage } />
        <Route exact path="/explorar/comidas" component={ MainExploreFood } />
        <Route exact path="/explorar/bebidas" component={ MainExploreDrink } />
        <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients } />
        <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route exact path="/receitas-feitas" component={ CompletedRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </RecipesAppProvider>
  );
}

export default App;
