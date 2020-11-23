import React from 'react';
import Header from '../../components/Header';
import BtnSearchBar from '../../components/BtnSearchBar';
import Footer from '../../components/Footer';

function ExplorePage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar"
        BtnSearchBar={ BtnSearchBar }
      />
      <h1> Página principal de Explorar</h1>
      <Footer />
    </div>
  );
}

export default ExplorePage;
