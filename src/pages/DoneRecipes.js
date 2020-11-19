import React from 'react';
import { connect } from 'react-redux';

class DoneRecipes extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="DoneRecipes-title">
          DoneRecipes
        </h1>
      </div>
    );
  }
}

export default connect(null, null)(DoneRecipes);
