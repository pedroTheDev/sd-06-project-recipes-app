import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explorar = () => (
  <div>
    <Header title="Explorar" />
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
