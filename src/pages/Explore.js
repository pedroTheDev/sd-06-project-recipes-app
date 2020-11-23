import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

const Explore = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Explorar');
  }, []);

  return (
    <h1>
      { title }
    </h1>
  );
};

export default Explore;
