import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorePage() {
  return (
    <div>
      <Header />
      <div>
        <Link to="/explorar/comidas">
          <button type="button">Vamos explorar comidas</button>
        </Link>
        <Link to="/explorar/bebidas">
          <button type="button">Vamos explorar bebidas</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorePage;
