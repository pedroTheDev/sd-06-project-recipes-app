import React from 'react';
import BtnSearchBar from '../../components/BtnSearchBar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function MealsPage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Comidas"
        BtnSearchBar={ BtnSearchBar }
      />
      <h1> Página principal de Comidas</h1>
      <Footer />
    </div>
  );
}
