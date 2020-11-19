import React from 'react';
import './App.css';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';

function App() {
  return (
    <LoginProvider>
      <div id="meals">
        <span>TRYBE</span>
        <Login />
      </div>
    </LoginProvider>
  );
}

export default App;
