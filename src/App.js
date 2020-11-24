import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Food from './pages/Food';
import Cocktail from './pages/CockTail';
import Recipe from './pages/Recipe';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreFoodByIngredients from './pages/ExploreFoodByIngredients';
import Perfil from './pages/Perfil';

function App() {
  return (
    <div className="App">
      <Switch>

        <Route exact path="/comidas/:id" component={ Recipe } />
        <Route exact path="/bebidas/:id" component={ Recipe } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodByIngredients }
        />
        <Route path="/explorar/comidas" component={ ExploreFood } />
        <Route path="/explorar/bebidas" component={ ExploreDrink } />
        <Route exact path="/comidas" component={ Food } />
        <Route exact path="/bebidas" component={ Cocktail } />
        <Route exact path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/" component={ Login } />

      </Switch>
    </div>
  );
}

export default App;
