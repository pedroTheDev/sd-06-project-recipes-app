import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './context/Provider';
import './App.css';
import Router from './router/Router';
import history from './helpers/History';

function App() {
  return (
    <Provider>
      <BrowserRouter history={ history }>
        <Router />
      </BrowserRouter>
    </Provider>

  );
}

export default App;
