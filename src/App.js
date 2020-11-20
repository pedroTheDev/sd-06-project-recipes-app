import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Provider
import RecipesProvider from './provider/RecipesProvider';

// Pages
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <RecipesProvider>
          <Route exact path="/" component={Login} />
        </RecipesProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
