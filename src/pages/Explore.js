import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class Explore extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        <Footer history={ history } />
      </div>
    );
  }
}

Explore.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(Explore);
