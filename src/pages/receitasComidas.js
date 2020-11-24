import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Footer, RecipesCard } from '../components';

import getMeals from '../services/theMealApi';
import addMeals from '../actions/meals';
import { addMealsCategories } from '../actions/categories';

class ReceitasComidas extends Component {
  async componentDidMount() {
    const { sendMeals } = this.props;
    const { meals } = await getMeals('search.php?s=');
    sendMeals(meals);
    this.getCategories();
  }

  async getCategories() {
    const { sendMealsCategories } = this.props;
    const { meals } = await getMeals('list.php?c=list');
    sendMealsCategories(meals);
  }

  render() {
    return (
      <div>
        <Header title="Comidas" />
        <RecipesCard />
        <Footer title="Comidas" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMeals: (meals) => dispatch(addMeals(meals)),
  sendMealsCategories: (meals) => dispatch(addMealsCategories(meals)),
});

export default connect(null, mapDispatchToProps)(ReceitasComidas);
