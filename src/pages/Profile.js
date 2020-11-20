import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Profile() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Perfil', search: false });
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Profile;
