import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login, Foods, Drink, Explore, Profile, DoneRecipes,
  FavoriteRecipes, FoodsDetails, DrinksDetails,
  FoodsRecipesInProgress, DrinksRecipesInProgress,
  ExploreDrinks, ExploreFoods, ExploreFoodsByIngredient, ExploreDrinksByIngredient,
  ExploreFoodsByArea,
} from './pages';
import './App.css';
import './Slider.scss';

function App() {
  return (
    <div className="master-container">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ FoodsRecipesInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinksRecipesInProgress } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsByIngredient }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredient }
        />
        <Route path="/explorar/comidas/area" component={ ExploreFoodsByArea } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/comidas/:id" component={ FoodsDetails } />
        <Route path="/bebidas/:id" component={ DrinksDetails } />
        <Route path="/bebidas" component={ Drink } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
