import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class Explore extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="explore-buttons">
        <Header history={ history } />
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          <h1>Explorar Comidas</h1>
        </button>
        <button
          type="button"
          onClick={ () => history.push('/explorar/bebidas') }
          data-testid="explore-drinks"
        >
          <h1>Explorar Bebidas</h1>
        </button>
        <Footer history={ history } />
      </div>
    );
  }
}

Explore.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(Explore);
