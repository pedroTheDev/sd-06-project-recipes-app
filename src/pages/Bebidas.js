import React from 'react';
import PropTypes, { array } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';

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
      //[3,4,5,6,7,8,9]
    return request.map((drink, index) => {
      return index <= 11 ? <DrinkCard drink={ drink } key={ drink.idDrink } index={ index } /> : null;
      
    });
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
