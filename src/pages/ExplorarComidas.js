import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';

function ExplorarComidas() {
  return (
    <div className="food">
      <Header />
      <div className="div-buttons">
        <Link to="/explorar/comidas/ingredientes">
          <button
            className="button-ingredient"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <br />
        <Link to="/explorar/comidas/area">
          <button
            className="button-area"
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
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

export default ExplorarComidas;
