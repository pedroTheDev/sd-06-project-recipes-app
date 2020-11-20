import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Foods from '../pages/Foods';
import FoodDetails from '../pages/FoodDetails';
import Drinks from '../pages/Drinks';
import DrinkDetails from '../pages/DrinkDetails';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/comidas" exact component={Foods} />
      <Route path="/comidas/:id" component={FoodDetails} />
      <Route path="/bebidas" exact component={Drinks} />
      <Route path="/bebidas/:id" component={DrinkDetails} />
      <Route path="/perfil" component={Profile} />
      <Route path="/explorar" component={Explore} />
    </Switch>
  );
}

export default Routes;
