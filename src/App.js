import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Perfil from './pages/Perfil';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route path="/comidas/:idRecipe" component={ RecipeDetails } />
        <Route path="/bebidas/:idRecipe" component={ RecipeDetails } />
        <Route path="/perfil" component={ Perfil } />
      </Switch>
    </Provider>
  );
}

export default App;
