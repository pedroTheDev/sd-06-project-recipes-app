import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorePage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar"
      />
      <button data-testid="explore-food">
        Explorar Comidas
      </button>
      <button data-testid="explore-drinks">
        Explorar Bebidas
      </button>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExplorePage;
