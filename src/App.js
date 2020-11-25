import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import Drink from './pages/Drink';
import Food from './pages/Food';
import Explore from './pages/Explore';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import ContextProvider from './context/ContextProvider';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreFoodIngredient from './pages/ExploreFoodIngredient';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/bebidas/:id" component={ DrinkDetails } />
          <Route path="/bebidas" component={ Drink } />
          <Route path="/comidas/:id" component={ FoodDetails } />
          <Route path="/comidas" component={ Food } />
          <Route path="/perfil" component={ Perfil } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodIngredient }
          />
          <Route path="/explorar/comidas" component={ ExploreFood } />
          <Route path="/explorar/bebidas" component={ ExploreDrink } />
          <Route path="/explorar" component={ Explore } />
          <Login />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
