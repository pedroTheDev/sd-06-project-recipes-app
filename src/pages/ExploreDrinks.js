import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
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
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
