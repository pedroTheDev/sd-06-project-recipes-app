import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explorar.css';

function ExplorarComidas() {
  return (
    <>
      <Header name="Explorar Comidas" button={ false } />
      <div className="explore-btn">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        {/* <Link> */}
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
        {/* </Link> */}
      </div>
      <Footer />
    </>
  );
}

export default ExplorarComidas;
