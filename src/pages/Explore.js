import React from 'react';
import { connect } from 'react-redux';

class Explore extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="Explore-title">
          Explore
        </h1>
      </div>
    );
  }
}

export default connect(null, null)(Explore);
