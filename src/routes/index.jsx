import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Foods from '../pages/Foods';
import FoodDetails from '../pages/FoodDetails';
import FoodInProgress from '../pages/FoodInProgress';
import Drinks from '../pages/Drinks';
import DrinkDetails from '../pages/DrinkDetails';
import DrinkInProgress from '../pages/DrinkInProgress';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import Explore from '../pages/Explore';
import Favorites from '../pages/Favorites';
import ExploreRecipes from '../pages/ExploreRecipes';
import ExploreIngredients from '../pages/ExploreIngredients';
import ExploreArea from '../pages/ExploreArea';
import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/comidas" exact render={ () => <Foods pageType="comidas" /> } />
      <Route
        path="/comidas/:id"
        exact
        render={ () => <FoodDetails pageType="comidas" /> }
      />
      <Route
        path="/comidas/:id/in-progress"
        render={ () => <FoodInProgress pageType="comidas" /> }
      />
      <Route
        path="/bebidas"
        sensitive
        exact
        render={ () => <Drinks pageType="bebidas" /> }
      />
      <Route
        path="/bebidas/:id"
        exact
        render={ () => <DrinkDetails pageType="bebidas" /> }
      />
      <Route
        path="/bebidas/:id/in-progress"
        exact
        render={ () => <DrinkInProgress pageType="bebidas" /> }
      />
      <Route path="/receitas-feitas" exact component={ DoneRecipes } />
      <Route path="/perfil" exact component={ Profile } />
      <Route path="/receitas-favoritas" exact component={ Favorites } />
      <Route path="/explorar" exact component={ Explore } />
      <Route
        path="/explorar/bebidas"
        exact
        render={ () => <ExploreRecipes pageType="bebidas" /> }
      />
      <Route
        path="/explorar/comidas"
        exact
        render={ () => <ExploreRecipes pageType="comidas" /> }
      />
      <Route
        path="/explorar/comidas/area"
        exact
        render={ () => <ExploreArea pageType="comidas" /> }
      />
      <Route
        path="/explorar/comidas/ingredientes"
        exact
        render={ () => <ExploreIngredients pageType="comidas" /> }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        exact
        render={ () => <ExploreIngredients pageType="bebidas" /> }
      />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default Routes;
