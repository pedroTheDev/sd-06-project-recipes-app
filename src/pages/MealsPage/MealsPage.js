import React from 'react';
import BtnSearchBar from '../../components/BtnSearchBar';
import Header from '../../components/Header';

function MealsPage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Comidas"
        BtnSearchBar={ BtnSearchBar }
      />
      <h1> Página principal de comidas</h1>
    </div>
  );
}

export default MealsPage;
