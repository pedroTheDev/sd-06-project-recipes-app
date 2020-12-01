import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

function ExplorePage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar"
      />
      <Link to="/explorar/comidas">
        <button
          data-testid="explore-food"
          className="btn btn-secondary"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          data-testid="explore-drinks"
          className="btn btn-secondary"
        >
          Explorar Bebidas
        </button>
      </Link>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExplorePage;
