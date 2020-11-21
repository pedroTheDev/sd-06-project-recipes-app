import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreDrinks from './pages/ExploreDrinks';

function App() {
  return (
    <div className="width360">
      <Switch>
        <Route exact path="/" component={ () => <Login title="Login" /> } />
        <Route exact path="/comidas" component={ () => <Foods title="Comidas" /> } />
        <Route exact path="/bebidas" component={ () => <Foods title="Bebidas" /> } />
        {/* <Route exact path={ `/comidas/${recipeId}` } component={ Foods } title="" />
        <Route exact path={ `/bebidas/${recipeId}` } component={ Foods } title="" />
        <Route exact path={ `/comidas/${recipeId}/in-progress` } component={ Foods } title="" />
        <Route exact path={ `/bebidas/${recipeId}/in-progress` }
        component={ Foods } title="" /> */}
        <Route
          exact
          path="/explorar"
          component={ () => <Explore title="Explorar" /> }
        />
        <Route
          exact
          path="/explorar/comidas"
          component={ () => <ExploreFoods title="Explorar Comidas" /> }
        />
        <Route
          exact
          path="/explorar/bebidas"
          component={ () => <ExploreDrinks title="Explorar Bebidas" /> }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ () => <Explore title="Explorar Ingredientes" /> }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ () => <Explore title="Explorar Ingredientes" /> }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ () => <Explore title="Explorar Origem" /> }
        />
        <Route
          exact
          path="/perfil"
          component={ () => <Profile title="Perfil" /> }
        />
        <Route
          exact
          path="/receitas-feitas"
          component={ () => <DoneRecipes title="Receitas Feitas" /> }
        />
        <Route
          exact
          path="/receitas-favoritas"
          component={ () => <FavoriteRecipes title="Receitas Favoritas" /> }
        />
      </Switch>
    </div>
  );
}
export default App;
