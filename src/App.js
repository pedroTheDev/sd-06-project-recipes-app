import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login, Foods, Drink, Explore, Profile, DoneRecipes,
  FavoriteRecipes, FoodsDetails, DrinksDetails,
  FoodsRecipesInProgress, DrinksRecipesInProgress,
  ExploreDrinks, ExploreFoods,
} from './pages';
import './App.css';
import './Slider.scss';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas/:id" component={ FoodsDetails } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ FoodsRecipesInProgress }
      />
      <Route path="/comidas" component={ Foods } />
      <Route exact path="/bebidas/:id" component={ DrinksDetails } />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ DrinksRecipesInProgress }
      />
      <Route path="/bebidas" component={ Drink } />
      <Route path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
