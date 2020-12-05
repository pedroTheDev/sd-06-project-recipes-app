import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import './Explore.css';

const Explore = () => {
  const { setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Explorar');
  }, []);

  return (
    <div className="explore-container">
      <Link className="explore-btn-link" to="/explorar/comidas">
        <button data-testid="explore-food" type="button" className="explore-btn-option">
          Explorar Comidas
        </button>
      </Link>
      <Link className="explore-btn-link" to="/explorar/bebidas">
        <button data-testid="explore-drinks" type="button" className="explore-btn-option">
          Explorar Bebidas
        </button>
      </Link>
    </div>
  );
};

export default Explore;
