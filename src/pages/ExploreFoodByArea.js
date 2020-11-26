import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function ExploreFoodByArea(props) {
  const { history: { location: { pathname } }, pageConfig } = props;

  const { header } = pageConfig;

  return (
    <Header
      componentConfig={ header }
      pathname={ pathname }
    />
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.explorarComidasLocalOrigem,
});

export default connect(mapStateToProps, null)(ExploreFoodByArea);

ExploreFoodByArea.propTypes = {
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
