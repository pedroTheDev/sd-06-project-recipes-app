import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Drink() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Bebidas', search: true });
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Drink;
