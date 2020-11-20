import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Food from './pages/Food';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/comidas" component={ Food } />
        <Route exact path="/" component={ Login } />
        {
        /*
        <Route path="/bebidas" component={definir} />
        <Route path="/comidas/{id-da-receita}" component={definir} />
        <Route path="/comidas/{id-da-receita}/in-progress" component={definir} />
        <Route path="/bebidas/{id-da-receita}/in-progress" component={definir} />
        <Route path="/explorar" component={definir} />
        <Route path="/bebidas/{id-da-receita}" component={definir} />
        <Route path="/explorar/comidas" component={definir} />
        <Route path="/explorar/bebidas" component={definir} />
        <Route path="/explorar/comidas/ingredientes" component={definir} />
        <Route path="/explorar/bebidas/ingredientes" component={definir} />
        <Route path="/explorar/comidas/area" component={definir} />
        <Route path="/perfil" component={definir} />
        <Route path="/receitas-feitas" component={definir} />
        <Route path="/receitas-favoritas" component={definir} /> */ }
      </Switch>
    </div>
  );
}

export default App;
