import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function ExploreFoods() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Explorar Comidas', search: false });
  }, []);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
