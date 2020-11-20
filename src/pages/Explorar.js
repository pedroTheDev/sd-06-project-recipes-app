import React from 'react';
import { Link } from 'react-router-dom';

const Explorar = () => (
  <div>
    <Link to="/explorar/comidas" data-testid="explore-food">
      <span>Explorar Comidas</span>
    </Link>
    <Link to="/explorar/bebidas" data-testid="explore-drinks">
      <span>Explorar Bebidas</span>
    </Link>
  </div>
);

export default Explorar;
