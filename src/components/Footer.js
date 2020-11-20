import React, { Component } from 'react';
// import PropTypes from 'prop-types';

function Footer() {
  return (
    <div data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn">Drinks</button>
      <button type="button" data-testid="explore-bottom-btn">Explore</button>
      <button type="button" data-testid="food-bottom-btn">Comidas</button>
    </div>
  );
}

export default Footer;
