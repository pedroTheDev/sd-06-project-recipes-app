import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { addFoodIngredients } from '../redux/actions/searchRecipes';

function ExploreFoodByIngredients(props) {
  const { history: { location: { pathname } }, pageConfig } = props;
  const { header } = pageConfig;
  return (
    <div>
      <Header pathname={ pathname } componentConfig={ header } />
      <p>pagina de explorar comida por ingrediente</p>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.explorarComidasIngredientes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchIngredients: () => dispatch(addFoodIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodByIngredients);

ExploreFoodByIngredients.propTypes = {
  pageConfig: PropTypes.shape({
    header: PropTypes.shape({
      title: PropTypes.string.isRequired,
      profileButton: PropTypes.bool.isRequired,
      searchButton: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
