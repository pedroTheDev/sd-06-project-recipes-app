import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login, Foods, Drinks, Explore, Profile, DoneRecipes,
  FavoriteRecipes, FoodsDetails, DrinksDetails,
  FoodsRecipesInProgress, DrinksRecipesInProgress,
} from './pages';
import './App.css';
import './Slider.scss';

function App() {
  return (
    <div className="master-container">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas/:id" component={ FoodsDetails } />
        <Route
          exact
          path="/comidas/52771/in-progress"
          component={ FoodsRecipesInProgress }
        />
        <Route path="/comidas" component={ Foods } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route
          exact
          path="/bebidas/178319/in-progress"
          component={ DrinksRecipesInProgress }
        />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
