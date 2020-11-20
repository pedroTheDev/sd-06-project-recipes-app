import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const Comidas = () => {
  const location = useLocation();
  console.log(location.pathname);
  return location.pathname === '/comidas' ? <Footer /> : null;
};

export default Comidas;
