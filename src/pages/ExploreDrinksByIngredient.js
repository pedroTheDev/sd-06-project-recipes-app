import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class ExploreDrinksByIngredient extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="explorefoods-container">
        <Header history={ history } />
        <p>lista de ingredientes</p>
        <Footer history={ history } />
      </div>
    );
  }
}

ExploreDrinksByIngredient.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(ExploreDrinksByIngredient);
