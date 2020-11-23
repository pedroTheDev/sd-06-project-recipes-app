import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Header from './components/Header';
import HeaderContext from './context/HeaderContext';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import ExploreFoods from './pages/ExploreFoods';
import IngredientDrinks from './pages/IngredientDrinks';
import IngredientFoods from './pages/IngredientFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import Explore from './pages/Explore';
import OriginFoods from './pages/OriginFoods';

function App() {
  const { title } = useContext(HeaderContext);
  const handleHeader = () => {
    if (
      title === 'Login'
      || title === 'Detalhe da Receita'
      || title === 'Receita em Processo'
    ) {
      return false;
    }
    return true;
  };
  return (
    <main>
      {handleHeader() && <Header />}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/bebidas/{id-da-receita}" component={ Drinks } />
        <Route exact path="/comidas/{id-da-receita}/in-progress" component={ Foods } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientFoods }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientDrinks }
        />
        <Route exact path="/explorar/comidas/area" component={ OriginFoods } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </main>

  );
}

export default App;
