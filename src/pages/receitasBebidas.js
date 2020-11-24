import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesCard from '../components/RecipesCard';

class ReceitasBebidas extends Component {
  render() {
    return (
      <div>
        <Header title="Bebidas" />
        <Footer title="Bebidas" />
        <RecipesCard />
      </div>
    );
  }
}

export default ReceitasBebidas;
