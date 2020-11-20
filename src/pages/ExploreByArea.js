import React, { useContext, useEffect } from 'react';
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
    </div>
  );
}

export default ExploreByArea;
