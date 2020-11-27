import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const enableSearch = false;
  return (
    <div>
      <Header pageTitle="Perfil" searchAbled={ enableSearch } />
      <Footer />
    </div>
  );
}

export default Perfil;
