import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

function Bebidas() {
  const location = useLocation();
  return location.pathname === '/bebidas' ? <Footer /> : null;
}

export default Bebidas;
