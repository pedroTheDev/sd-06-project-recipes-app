import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../components';

class DoneRecipes extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(DoneRecipes);
