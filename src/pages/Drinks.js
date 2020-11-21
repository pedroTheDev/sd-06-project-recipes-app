import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RevenueContext from '../context/RevenueContext';
import Footer from '../components/Footer';

export default function Drinks(props) {
  const { title } = props;
  const { setSearchButton, setSearch } = useContext(RevenueContext);
  useEffect(() => {
    setSearchButton(false);
    return () => {
      setSearchButton(true);
      setSearch(false);
    };
  }, []);
  return (
    <div>
      <Header title={ title } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  title: PropTypes.string.isRequired,
};
