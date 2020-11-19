import React from 'react';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path='/comidas' component={ Comidas } />
        <Route exact path='/' component={ Login } />
      </BrowserRouter>
    </div>
  );
}

export default App;
