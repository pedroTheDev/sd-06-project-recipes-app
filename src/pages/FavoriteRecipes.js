import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class FavoriteRecipes extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="FavoriteRecipes-title">
          <Header history={history} />
          <Footer history={history} />
        </h1>
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(FavoriteRecipes);
