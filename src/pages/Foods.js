import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class Foods extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="Foods-title">
          <Header history={history} />
          <Footer history={history} />
        </h1>
      </div>
    );
  }
}

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(Foods);
