import React, { Component } from 'react';

import { Header, Footer, RecipesCard } from '../components';

class ReceitasComidas extends Component {
  render() {
    return (
      <div>
        <Header title="Comidas" />
        <Footer title="Comidas" />
        <RecipesCard />
      </div>
    );
  }
}

export default ReceitasComidas;
