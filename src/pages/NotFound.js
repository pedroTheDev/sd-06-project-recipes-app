import React from 'react';
import { connect } from 'react-redux';

class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found-container">
        <input
          type="image"
          alt="not-found-gif"
          src="https://www.moes.com/assets/moes/img/testing/404/CryingChip404.gif"
          width="100%px"
        />
        <p>
          {
            'Page not Found :('
            + ' '
          }
        </p>
      </div>
    );
  }
}

export default connect(null, null)(NotFound);
