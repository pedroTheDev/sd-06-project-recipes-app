import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class DoneRecipes extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="DoneRecipes-title">
          <Header history={histor} />
          <Footer history={history} />
        </h1>
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(DoneRecipes);
