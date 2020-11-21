import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
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
      <Footer />
    </div>
  );
}

export default Profile;
