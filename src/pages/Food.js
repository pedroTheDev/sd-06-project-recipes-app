import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Food() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Comidas', search: true });
  }, []);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Food;
