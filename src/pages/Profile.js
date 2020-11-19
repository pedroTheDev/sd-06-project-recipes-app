import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="Profile-title">
          Profile
        </h1>
      </div>
    );
  }
}

export default connect(null, null)(Profile);
