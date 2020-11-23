import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import LoginProvider from './context/LoginProvider';
import HeaderProvider from './context/HeaderProvider';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <HeaderProvider>
          <RecipesProvider>
            <Routes />
          </RecipesProvider>
        </HeaderProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
