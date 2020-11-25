import React from 'react';
import BtnSearchBar from '../../components/BtnSearchBar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function MealsPage() {
  return (
    <div>
      <h1> Página principal de Comidas</h1>
      <Header
        className="header"
        pageTitle="Comidas"
        BtnSearchBar={ BtnSearchBar }
      />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
