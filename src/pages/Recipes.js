import React from 'react';

function Recipes() {
  const localEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h1>Receitas</h1>
      <h3>{`Email: ${localEmail.email}`}</h3>
    </div>
  );
}

export default Recipes;
