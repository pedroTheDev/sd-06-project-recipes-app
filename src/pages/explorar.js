import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Explore from '../components/Explore';
import ExploreOptions from '../components/ExploreOptions';

class Explorar extends Component {
  render() {
    const { title } = this.props;

    return (
      <div>
        <Header title={ title || 'Explorar' } />
        {!title ? <Explore /> : <ExploreOptions { ...this.props } />}
        <Footer />
      </div>
    );
  }
}

Explorar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Explorar;
