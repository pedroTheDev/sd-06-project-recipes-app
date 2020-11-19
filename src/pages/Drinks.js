import React from 'react';
import { connect } from 'react-redux';

class Drinks extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="Drinks-title">
          Drinks
        </h1>
      </div>
    );
  }
}

export default connect(null, null)(Drinks);
