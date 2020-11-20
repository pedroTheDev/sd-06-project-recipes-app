import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../components';

class FoodsDetails extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
      </div>
    );
  }
}

FoodsDetails.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(FoodsDetails);
