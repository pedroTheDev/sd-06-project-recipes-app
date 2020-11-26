import React from 'react';
import Header from '../components/Header';
import RecipeList from '../components/RecipeList';
import Footer from '../components/Footer';

function Menu() {
  return (
    <div>
      <Header />
      <RecipeList />

      <Footer />
    </div>
  );
}

export default Menu;
