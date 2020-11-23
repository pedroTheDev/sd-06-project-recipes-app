import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Perfil from './pages/Perfil';
import favoriteFoods from './pages/FavoriteFoods';
import recipesMade from './pages/RecipesMade';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/comidas" component={Foods} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/receitas-feitas" component={recipesMade} />
        <Route path="/receitas-favoritas" component={favoriteFoods} />
      </Switch>
    </Provider>
  );
}

export default App;
