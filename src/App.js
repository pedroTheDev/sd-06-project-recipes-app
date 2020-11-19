import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/comidas" component={Comidas} />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
