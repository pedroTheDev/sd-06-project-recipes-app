import React from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

function Drinks() {
  return (
    <div className="drinks-page">
      <Header pageName="Bebidas" showSearch />
      <Navbar />
    </div>
  );
}

export default Drinks;
