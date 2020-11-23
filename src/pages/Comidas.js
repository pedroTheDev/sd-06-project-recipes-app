import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from '../components/Header';

function Comidas({ retrievedFood }) {
  const checkRequestSize = (request) => {
    if (request === null) {
      alert('Nenhuma receita encontrada');
    } else if (request.length === 0) {
      return null;
    } else if (request.length === 1) {
      const { idMeal } = request[0];
      return <Redirect to={ `/comidas/${idMeal}` } />;
    } else {
      return request.map((meal) => (
        <div key={ meal.idMeal }>{ meal.strMeal }</div>
      ));
    }
    return null;
  };
  return (
    <main>
      <Header pageName="Comidas" renderSearch />
      Comidas Page
      { checkRequestSize(retrievedFood) }

    </main>
  );
}

const mapStateToProps = (state) => ({
  retrievedFood: state.searchReducer.meals,
});

Comidas.propTypes = {
  retrievedFood: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Comidas);
