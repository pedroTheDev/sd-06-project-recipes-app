import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Perfil from './pages/Perfil';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/comidas" component={Menu} />
          <Route exact path="/bebidas" component={Menu} />
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
