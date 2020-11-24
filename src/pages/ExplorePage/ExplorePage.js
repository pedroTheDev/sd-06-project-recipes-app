import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorePage() {
  return (
    <div>
      <h1> Página principal de Explorar</h1>

      <Header
        className="header"
        pageTitle="Explorar"
      />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExplorePage;
