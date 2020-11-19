import React from 'react';
import { connect } from 'react-redux';

class SearchInput extends React.Component {
  render() {
    return (
      <div>
        <input data-testid="search-input" />
      </div>
    );
  }
}

export default connect(null, null)(SearchInput);
