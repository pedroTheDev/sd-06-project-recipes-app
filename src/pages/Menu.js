import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeList from '../components/RecipeList';

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
