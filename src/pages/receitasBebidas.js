import React, { Component } from 'react';

import { Header, Footer, RecipesCard } from '../components';

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
