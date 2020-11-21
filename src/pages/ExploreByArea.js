import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function ExploreByArea() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Explorar Origem', search: true });
  }, []);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default ExploreByArea;
