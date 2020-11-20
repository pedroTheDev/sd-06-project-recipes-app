import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Explorar = () => (
  <div>
    <Link to="/explorar/comidas" data-testid="explore-food">
      <span>Explorar Comidas</span>
    </Link>
    <Link to="/explorar/bebidas" data-testid="explore-drinks">
      <span>Explorar Bebidas</span>
    </Link>
    <Footer />
  </div>
);

export default Explorar;
