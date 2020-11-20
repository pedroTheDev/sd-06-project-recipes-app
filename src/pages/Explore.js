import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Explore.css';

export default function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <div className="body-explore">
        <div>
          <button type="button">Explorar Comidas</button>
        </div>
        <div>
          <button type="button">Explorar Bebidas</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
