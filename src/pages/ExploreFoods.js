import React from 'react';
import { connect } from 'react-redux';

class ExploreFoods extends React.Component {
  render() {
    return (
      <div className="explorefoods-container">
        <button type="button" data-testid="explore-by-ingredient">a</button>
        <button type="button" data-testid="explore-by-ingredient">a</button>
        <button type="button" data-testid="explore-by-ingredient">a</button>
      </div>
    );
  }
}

export default connect(null, null)(ExploreFoods);
