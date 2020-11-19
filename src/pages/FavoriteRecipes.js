import React from 'react';
import { connect } from 'react-redux';

class FavoriteRecipes extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="FavoriteRecipes-title">
          FavoriteRecipes
        </h1>
      </div>
    );
  }
}

export default connect(null, null)(FavoriteRecipes);
