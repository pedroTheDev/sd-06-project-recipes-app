import React from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

function Foods() {
  return (
    <div className="foods-page">
      <Header pageName="Comidas" showSearch />
      <Navbar />
    </div>
  );
}

export default Foods;
