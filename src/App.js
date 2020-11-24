import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Food from './pages/Food';
import Drink from './pages/Drink';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreFoodByIngredients from './pages/ExploreFoodByIngredients';
import Perfil from './pages/Perfil';
import FoodDetail from './pages/FoodDetail';
import DrinkDetail from './pages/DrinkDetail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/comidas" component={ Food } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/bebidas" component={ Drink } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/bebidas/178319" component={ DrinkDetail } />
        <Route path="/explorar/comidas" component={ ExploreFood } />
        <Route path="/explorar/bebidas" component={ ExploreDrink } />
        <Route path="/comidas/52771" component={ FoodDetail } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodByIngredients }
        />
        <Route path="/perfil" component={ Perfil } />
        {
        /*
        <Route path="/comidas/{id-da-receita}/in-progress" component={definir} />
        <Route path="/bebidas/{id-da-receita}/in-progress" component={definir} />
        <Route path="/explorar/bebidas/ingredientes" component={definir} />
        <Route path="/explorar/comidas/area" component={definir} />
        <Route path="/receitas-feitas" component={definir} />
        <Route path="/receitas-favoritas" component={definir} /> */ }
      </Switch>
    </div>
  );
}

export default App;
