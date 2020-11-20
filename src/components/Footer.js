import React from 'react';
import { connect } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
// import PropTypes from 'prop-types';

class Footer extends React.Component {
  render() {
    return (
      <footer className="global-footer" data-testid="footer">
        <input src={ drinkIcon } type="image" alt="bla" />
        <input src={ exploreIcon } type="image" alt="bla" />
        <input src={ mealIcon } type="image" alt="bla" />
      </footer>
    );
  }
}

export default connect(null, null)(Footer);
