import React from 'react';
import { connect } from 'react-redux';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        Not Found
      </div>
    );
  }
}

export default connect(null, null)(NotFound);
