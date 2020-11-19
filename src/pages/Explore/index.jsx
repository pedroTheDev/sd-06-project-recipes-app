import React from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

function Explore() {
  return (
    <div className="explore-page">
      <Header pageName="Explorar" showSearch />
      <Navbar />
    </div>
  );
}

export default Explore;
