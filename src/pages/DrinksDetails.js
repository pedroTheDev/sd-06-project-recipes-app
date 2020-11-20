import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../components';

class DrinksDetails extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        <div>oi oi oi</div>
      </div>
    );
  }
}

DrinksDetails.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(DrinksDetails);
