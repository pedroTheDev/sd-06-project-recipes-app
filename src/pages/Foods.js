import React from 'react';
import { connect } from 'react-redux';

class Foods extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="Foods-title">
          Foods
        </h1>
      </div>
    );
  }
}

export default connect(null, null)(Foods);
