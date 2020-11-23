import React, { useContext, useState } from 'react';
import MealsContext from '../context/MealsContext';
import React from 'react';
import Footer from '../components/Footer';

function Perfil() {
  const [email, setEmail] = useState("")
  const {
    email,
    setEmail,
  } = useContext(MealsContext);
  console.log(email)

  return (
    <div>
      <h1 data-testid="page-title">Perfil</h1>
      <div data-testid="profile-email">
        aqui vai ficar o email
      </div>
      <button 
        type="button"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <button 
        type="button"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>
      <Footer />
    </div>
  );
}

export default Perfil;
