import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function ExploreDrinks() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Explorar Bebidas', search: false });
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default ExploreDrinks;
