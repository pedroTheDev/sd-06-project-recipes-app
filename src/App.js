import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import MealsPage from './pages/MealsPage/MealsPage';
import DrinksPage from './pages/DrinksPage/DrinksPage';
import ExplorePage from './pages/ExplorePage/ExplorePage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MealsPage } />
      <Route exact path="/bebidas" component={ DrinksPage } />
      <Route exact path="/explorar" component={ ExplorePage } />
    </Switch>
  );
}

export default App;
