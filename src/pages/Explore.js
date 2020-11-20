import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RevenueContext from '../context/RevenueContext';

export default function Explore(props) {
  const { title } = props;
  const { setSearchButton, setSearch } = useContext(RevenueContext);
  useEffect(() => {
    if (title === 'Explorar Origem') setSearchButton(false);
    return () => {
      setSearchButton(true);
      setSearch(false);
    };
  }, []);
  return (
    <Header title={ title } />
  );
}

Explore.propTypes = {
  title: PropTypes.string.isRequired,
};
