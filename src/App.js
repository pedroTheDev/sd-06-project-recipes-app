import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './components/Login';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </Provider>
  );
}

export default App;
