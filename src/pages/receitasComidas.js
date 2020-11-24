import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesCard from '../components/RecipesCard';

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
