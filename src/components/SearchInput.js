import React from 'react';
import { connect } from 'react-redux';

class SearchInput extends React.Component {
  render() {
    return (
      <div className="toogle-search-input">
        <input data-testid="search-input" />
      </div>
    );
  }
}

export default connect(null, null)(SearchInput);
