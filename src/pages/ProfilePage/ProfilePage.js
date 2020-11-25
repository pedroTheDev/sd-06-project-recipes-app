import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function ProfilePage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Perfil"
      />
      <h1>Tela de Perfil </h1>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
