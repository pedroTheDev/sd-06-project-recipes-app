import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explorar.css';

function ExplorarBebidas() {
  return (
    <>
      <Header name="Explorar Bebidas" button={ false } />
      <div className="explore-btn">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
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

export default ExplorarBebidas;
