import React from 'react';
import { connect } from 'react-redux';

class ExploreFoods extends React.Component {
  render() {
    return (
      <div className="explorefoods-container">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
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

export default connect(null, null)(ExploreFoods);
