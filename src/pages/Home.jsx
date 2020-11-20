import React, { useEffect } from 'react';
import Login from '../components/Login';
import { requestApiFoodDetails } from '../services/requestFood';
import { requestApiDrinkDetails } from '../services/requestDrink';
// import requestApiDrink from '../services/request';

function Home() {
  useEffect(() => { requestApiFoodDetails('52772'); }, [])
  return (
    <Login />
  );
}

export default Home;
