import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Perfil from './pages/Perfil';
import MenuDetails from './pages/MenuDetails';
import NotFound from './pages/NotFound';
import Explore from './pages/Explore';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/comidas" component={ Menu } />
          <Route exact path="/bebidas" component={ Menu } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/comidas/:id" component={ MenuDetails } />
          <Route exact path="/bebidas/:id" component={ MenuDetails } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/" component={ Login } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
