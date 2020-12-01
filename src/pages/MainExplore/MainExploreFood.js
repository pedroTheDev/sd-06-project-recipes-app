import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function MainExploreFood() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Comidas"
      />
      <div className="explore-area">
        <nav className="navigation">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="btn btn-secondary"
          >
            Por Ingredientes
          </button>
          <button
            type="button"
            data-testid="explore-by-area"
            className="btn btn-secondary"
          >
            Por Local de Origem
          </button>
          <button
            type="button"
            data-testid="explore-surprise"
            className="btn btn-secondary"
          >
            Me Surpreenda!
          </button>
        </nav>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>

  );
}

export default MainExploreFood;
