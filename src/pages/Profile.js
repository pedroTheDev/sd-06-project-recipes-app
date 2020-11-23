import React, { useEffect, useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

const Profile = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Perfil');
  }, []);

  return (
    <h1>
      { title }
    </h1>
  );
};

export default Profile;
