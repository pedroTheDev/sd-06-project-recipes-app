import React from 'react';
import Footer from '../components/Footer';

function Recipes() {
  const localEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h1>Receitas</h1>
      <h3>{/* `Email: ${localEmail.email}` */}</h3>
      <Footer />
    </div>
  );
}

export default Recipes;
