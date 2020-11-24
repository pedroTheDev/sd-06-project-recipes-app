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
      <Footer />
    </div>
  );
}
