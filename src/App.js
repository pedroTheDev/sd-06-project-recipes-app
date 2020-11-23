import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import RecipesDetails from './pages/RecipesDetails/RecipesDetails';
import RecipesPage from './pages/RecipesPage/RecipesPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ RecipesPage } />
      <Route exact path="/bebidas" component={ RecipesPage } />
      <Route exact path={`/comidas/${id}`} component={ RecipesDetails } />
      <Route exact path={`/bebidas/${id}`} component={ RecipesDetailscipesDetails} />
    </Switch>
  );
}

export default App;
