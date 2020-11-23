import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="width360">
      <Switch>
        <Route exact path="/" component={ () => <Login title="Login" /> } />
        <Route exact path="/comidas" component={ () => <MainPage title="Comidas" /> } />
        <Route exact path="/bebidas" component={ () => <MainPage title="Bebidas" /> } />
        {/* <Route exact path={ `/comidas/${recipeId}` } component={ Foods } title="" />
        <Route exact path={ `/bebidas/${recipeId}` } component={ Foods } title="" />
        <Route exact path={ `/comidas/${recipeId}/in-progress` } component={ Foods } title="" />
        <Route exact path={ `/bebidas/${recipeId}/in-progress` }
        component={ Foods } title="" /> */}
        <Route
          exact
          path="/explorar"
          component={ () => <MainPage title="Explorar" /> }
        />
        <Route
          exact
          path="/explorar/comidas"
          component={ () => <MainPage title="Explorar Comidas" /> }
        />
        <Route
          exact
          path="/explorar/bebidas"
          component={ () => <MainPage title="Explorar Bebidas" /> }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ () => <MainPage title="Explorar Ingredientes" /> }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ () => <MainPage title="Explorar Ingredientes" /> }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ () => <MainPage title="Explorar Origem" /> }
        />
        <Route
          exact
          path="/perfil"
          component={ () => <MainPage title="Perfil" /> }
        />
        <Route
          exact
          path="/receitas-feitas"
          component={ () => <MainPage title="Receitas Feitas" /> }
        />
        <Route
          exact
          path="/receitas-favoritas"
          component={ () => <MainPage title="Receitas Favoritas" /> }
        />
      </Switch>
    </div>
  );
}
export default App;
