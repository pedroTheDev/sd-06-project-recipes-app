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
        <Route exact path="/explorar" component={ ExplorePage } />
      </Switch>
    </RecipesAppProvider>
  );
}

export default App;
