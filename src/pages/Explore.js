import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';

const Explore = () => {
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Explorar');
  }, []);

  return (
    <div>
      <Link to="/explorar/comidas">
        <button data-testid="explore-food" type="button">
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button data-testid="explore-drinks" type="button">
          Explorar Bebidas
        </button>
      </Link>
    </div>
  );
};

export default Explore;
