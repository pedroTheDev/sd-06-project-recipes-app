import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';

function ExplorarBebidas() {
  return (
    <div className="food">
      <Header title="Explorar Bebidas"/>
      <div className="div-buttons">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            className="button-ingredient"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <br />
        <button
          className="button-surprise"
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
