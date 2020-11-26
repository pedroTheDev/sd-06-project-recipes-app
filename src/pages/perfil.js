import React, { Component } from 'react';

import { Header, Footer } from '../components';

class Perfil extends Component {
  
  render() {
    const emailLS = localStorage.getItem('user');
    console.log(emailLS)

    return (
      <div>
        <Header title="Perfil" />
        <div>
          <h3 data-testid="profile-email">emailLS</h3>
          <button data-testid="profile-done-btn">receitas feitas</button>
          <button data-testid="profile-favorite-btn">receitas favoritas</button>
          <button data-testid="profile-logout-btn">sair</button>
        </div>
        <Footer title="Perfil" />
      </div>
    );
  }
}

export default Perfil;
