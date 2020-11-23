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

function App() {
  const { title } = useContext(HeaderContext);
  const handleHeader = () => {
    if (title === 'Login' || title === 'Detalhe da Receita' || title === 'Receita em Processo') {
      return false;
    }
    return true;
  };
  return (
    <main>
      {handleHeader() && <Header />}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/comidas" component={Foods} />
        <Route path="/bebidas" component={Drinks} />
        <Route path="/bebidas/{id-da-receita}" component={Drinks} />
        <Route path="/comidas/{id-da-receita}/in-progress" component={Foods} />
        <Route path="/explorar" component={Explore} />
        <Route path="/explorar/comidas" component={ExploreFoods} />
        <Route path="/explorar/bebidas" component={ExploreDrinks} />
        <Route path="/explorar/comidas/ingredientes" component={IngredientFoods} />
        <Route path="/explorar/bebidas/ingredientes" component={IngredientDrinks} />
        <Route path="/explorar/comidas/area" component={ExploreFoods} />
        <Route path="/perfil" component={Profile} />
        <Route path="/receitas-feitas" component={DoneRecipes} />
        <Route path="/receitas-favoritas" component={FavoriteRecipes} />
      </Switch>
    </main>

  );
}

export default App;
