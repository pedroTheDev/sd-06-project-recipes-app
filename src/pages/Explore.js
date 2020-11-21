import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RevenueContext from '../context/RevenueContext';
import Footer from '../components/Footer';

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
    <div>
      <Header title={ title } />
      <div className="container">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="lexplore-drink"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  title: PropTypes.string.isRequired,
};
