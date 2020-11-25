import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BtnSearchBar from '../../components/BtnSearchBar';

export default function DrinksPage() {
  return (
    <div>
      <h1> Página principal de Drinks</h1>
      <Header
        className="header"
        pageTitle="Explorar Bebidas"
        BtnSearchBar={ BtnSearchBar }
      />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
