import React from 'react';
import { Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
