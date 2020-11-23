import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from '../components/Header';

function Bebidas({ retrievedDrinks }) {
  const checkRequestSize = (request) => {
    if (request === null) {
      alert('Nenhuma receita encontrada');
    } else if (request.length === 0) {
      return null;
    } else if (request.length === 1) {
      const { idDrink } = request[0];
      return <Redirect to={ `/bebidas/${idDrink}` } />;
    } else {
      return request.map((drink) => (
        <div key={ drink.idDrink }>{ drink.strDrink }</div>
      ));
    }
    return null;
  };
  return (
    <main>
      <Header pageName="Bebidas" renderSearch />
      Bebidas Page
      { checkRequestSize(retrievedDrinks) }
    </main>
  );
}

const mapStateToProps = (state) => ({
  retrievedDrinks: state.searchReducer.drinks,
});

Bebidas.propTypes = {
  retrievedDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Bebidas);
