import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ExploreOptions extends Component {
  render() {
    const { location: { pathname } } = this.props;
    const path = pathname;
    return (
      <div>
        <Link data-testid="explore-by-ingredient" to={ `${pathname}/ingredientes` }>
          Por Ingredientes
        </Link>
        {!path.includes('bebidas') && (
          <Link data-testid="explore-by-area" to={ `${pathname}/area` }>
            Por Local de Origem
          </Link>
        )}
        <Link data-testid="explore-surprise" to="/">
          Me Surpreenda!
        </Link>
      </div>
    );
  }
}

ExploreOptions.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreOptions;
