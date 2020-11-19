import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import AppProvider from './hooks';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
