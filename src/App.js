import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './context/Provider';
import './App.css';
import Router from './components/Router';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>

  );
}

export default App;
