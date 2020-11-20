import React from 'react';
import { Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import MealsPage from './pages/MealsPage/MealsPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/comidas" component={MealsPage} />
    </Switch>
  );
}

export default App;
