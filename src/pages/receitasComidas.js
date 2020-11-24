import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header, Footer, RecipesCardMeals } from '../components';

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
        <RecipesCardMeals />
        <Footer title="Comidas" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMeals: (meals) => dispatch(addMeals(meals)),
  sendMealsCategories: (meals) => dispatch(addMealsCategories(meals)),
});

ReceitasComidas.propTypes = {
  sendMealsCategories: PropTypes.func.isRequired,
  sendMeals: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ReceitasComidas);
