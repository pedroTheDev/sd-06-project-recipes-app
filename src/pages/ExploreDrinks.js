import React from 'react';
import { connect } from 'react-redux';

class ExploreDrinks extends React.Component {
  render() {
    return (
      <div className="exploredrinks-container">
        <button type="button" data-testid="explore-by-ingredient">a</button>
        <button type="button" data-testid="explore-by-ingredient">a</button>
        <button type="button" data-testid="explore-by-ingredient">a</button>
      </div>
    );
  }
}

export default connect(null, null)(ExploreDrinks);
