import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './Context/Provider';

import Login from './Pages/Login';
import Comidas from './Pages/Comidas';
import Bebidas from './Pages/Bebidas';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/comidas" component={Comidas} />
          <Route path="/bebidas" component={Bebidas} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
