import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import MealsPage from './pages/MealsPage/MealsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import DrinksPage from './pages/DrinksPage/DrinksPage';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import RecipesAppProvider from './context/RecipesAppProvider';

function App() {
  return (
    <RecipesAppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MealsPage } />
        <Route exact path="/perfil" component={ ProfilePage } />
        <Route exact path="/bebidas" component={ DrinksPage } />
        <Route exact path="/comidas/:id" component={ Detail } />
        <Route exact path="/bebidas/:id" component={ Detail } />
        <Route exact path="/comidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/explorar" component={ ExplorePage } />
        <Route exact path="/explorar/comidas" component={ MainExplore } />
        <Route exact path="/explorar/bebidas" component={ MainExplore } />
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
