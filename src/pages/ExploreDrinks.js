import React from 'react';
import { connect } from 'react-redux';

class ExploreDrinks extends React.Component {
  render() {
    return (
      <div className="exploredrinks-container">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
    );
  }
}

export default connect(null, null)(ExploreDrinks);
