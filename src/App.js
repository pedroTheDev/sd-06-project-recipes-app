import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/index';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header title="Comidas" />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
