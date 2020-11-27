import React, { Component } from 'react';

export default class ExplorerDrinks extends Component {
  render() {
    return (
      <div>
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </div>
    );
  }
}
