import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function MainExploreDrink() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Bebidas"
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

export default MainExploreDrink;
