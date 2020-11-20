import React, { useEffect } from 'react';
import { fetcherThunk } from '../redux/actions/mainPageFetcher';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';

const Comidas = (props) => {
  const dispatch = useDispatch();
  useEffect(
    dispatch(fetcherThunk(props.location.pathname))
  );
  return(
    <div>
      teste
      <Footer />
    </div>
  )
}

export default Comidas;
