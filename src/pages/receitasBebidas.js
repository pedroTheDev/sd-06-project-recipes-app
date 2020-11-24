import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Footer, RecipesCard } from '../components';

import getCockTail from '../services/theCockTailApi';
import addDrinks from '../actions/drinks';
import { addDrinksCategories } from '../actions/categories';

class ReceitasBebidas extends Component {
  async componentDidMount() {
    const { sendCockTail } = this.props;
    const { drinks } = await getCockTail('search.php?s=');
    sendCockTail(drinks);
    this.getCategories();
  }

  async getCategories() {
    const { sendCocktailCategories } = this.props;
    const { drinks } = await getCockTail('list.php?c=list');
    sendCocktailCategories(drinks);
  }

  render() {
    return (
      <div>
        <Header title="Bebidas" />
        <RecipesCard />
        <Footer title="Bebidas" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendCockTail: (drinks) => dispatch(addDrinks(drinks)),
  sendCocktailCategories: (drinks) => dispatch(addDrinksCategories(drinks)),
});

export default connect(null, mapDispatchToProps)(ReceitasBebidas);
