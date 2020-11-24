import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/RecipeCard';

function Meals() {
  const TRUE = true;
  return (
    <div>
      <Header title="Comidas" search={ TRUE } />
      <Card />
      <Footer />
    </div>
  );
}

export default Meals;
