import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFood from '../components/ExploreFood';
import ExploreDrinks from '../components/ExploreDrinks';

function Explorar() {
  return (
    <div>
      <Header pageTitle="Explorar" searchAbled={ false } />
      <Footer />
      <ExploreFood />
      <ExploreDrinks />
    </div>
  );
}

export default Explorar;
