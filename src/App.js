import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import MainFood from './pages/mainFood';
import MainDrink from './pages/mainDrink';
import Explore from './pages/explore';
import ExploreFood from './pages/exploreFood';
import ExploreDrink from './pages/exploreDrink';
import ExploreFoodByIngre from './pages/exploreFoodByIngre';
import ExploreDrinkByIngre from './pages/exploreDrinkByIngre';
import ExploreFoodOriginLocal from './pages/exploFoodByOriginLoca';
import Profile from './pages/profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/comidas" component={MainFood} />
        <Route path="/bebidas" component={MainDrink} />
        <Route path="/explorar" component={Explore} />
        <Route path="/explorar/comidas" component={ExploreFood} />
        <Route path="/explorar/bebidas" component={ExploreDrink} />
        <Route path="/explorar/comidas/ingredientes" component={ExploreFoodByIngre} />
        <Route path="/explorar/bebidas/ingredientes" component={ExploreDrinkByIngre} />
        <Route path="/explorar/comidas/area" component={ExploreFoodOriginLocal} />
        <Route path="/perfil" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
