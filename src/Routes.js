import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

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
import Footer from './components/Footer';

const Routes = () => {
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
  const handleFooter = () => {
    if (title === 'Comidas' || title === 'Explorar' || title === 'Explorar Comidas'
      || title === 'Explorar Ingredientes' || title === 'Explorar Origem'
      || title === 'Perfil' || title === 'Bebidas'
      || title === 'Explorar Bebidas' || title === 'Explorar Comidas') {
      return true;
    }
    return false;
  };

  return (
    <main>
      { handleHeader() && <Header />}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/explorar/comidas/ingredientes" component={ IngredientFoods } />
        <Route path="/explorar/bebidas/ingredientes" component={ IngredientDrinks } />
        <Route path="/comidas/{id-da-receita}/in-progress" component={ Foods } />
        <Route path="/explorar/comidas/area" component={ OriginFoods } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/bebidas/{id-da-receita}" component={ Drinks } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
      {handleFooter() && <Footer />}
    </main>
  );
};
export default Routes;
