import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/comidas" component={Foods} />
      <Route path="/profile" component={Profile} />
      <Route path="/bebidas" component={Drinks} />
      <Route path="/explorar" component={Explore} />
    </Switch>
  );
}

export default Routes;
