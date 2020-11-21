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

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/comidas" exact render={() => <Foods pageType="Comidas" />} />
      <Route path="/comidas/:id" exact render={() => <FoodDetails pageType="Comidas" />} />
      <Route path="/comidas/:id/in-progress" render={() => <FoodInProgress pageType="Comidas" />} />
      <Route path="/bebidas" exact render={() => <Drinks pageType="Bebidas" />} />
      <Route path="/bebidas/:id" exact render={() => <DrinkDetails pageType="Bebidas" />} />
      <Route path="/bebidas/:id/in-progress" render={() => <DrinkInProgress pageType="Bebidas" />} />
      <Route path="/receitas-feitas" component={DoneRecipes} />
      <Route path="/perfil" component={Profile} />
      <Route path="/explorar" component={Explore} />
    </Switch>
  );
}

export default Routes;
