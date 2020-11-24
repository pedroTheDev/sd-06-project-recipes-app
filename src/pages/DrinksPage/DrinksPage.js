import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BtnSearchBar from '../../components/BtnSearchBar';

export default function DrinksPage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Bebidas"
        BtnSearchBar={ BtnSearchBar }
      />
      <Footer />
    </div>
  );
}
