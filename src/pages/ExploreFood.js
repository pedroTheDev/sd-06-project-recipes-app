import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

import Footer from '../components/Footer';

function ExploreFood(props) {
  const { history: { location: { pathname } }, pageConfig } = props;
  const { header } = pageConfig;
  return (
    <div>
      <Header pathname={ pathname } componentConfig={ header } />
      <p>página de explorar comida</p>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.explorarComidas,
});

export default connect(mapStateToProps, null)(ExploreFood);

ExploreFood.propTypes = {
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
