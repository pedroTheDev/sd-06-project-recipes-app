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
        <div className="explore-buttons-div">
          <button
            type="button"
            className="explore-button"
            data-testid="explore-food"
            onClick={ () => history.push('/explorar/comidas') }
          >
            Explorar Comidas
          </button>
          <button
            type="button"
            className="explore-button"
            onClick={ () => history.push('/explorar/bebidas') }
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

Explore.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(Explore);
