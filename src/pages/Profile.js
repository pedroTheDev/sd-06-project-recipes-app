import React, { useEffect, useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

const Profile = () => {
  const { setTitle } = useContext(HeaderContext);
  useEffect(() => {
    setTitle('Perfil');
  }, []);
  return (
    <div>
      oi
    </div>
  );
};

export default Profile;
