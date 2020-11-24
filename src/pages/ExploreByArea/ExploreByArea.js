import React from 'react';
import Header from '../../components/Header';
import BtnSearchBar from '../../components/BtnSearchBar';

function ExploreByArea() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Origem"
        BtnSearchBar={ BtnSearchBar }
      />
    </div>
  );
}

export default ExploreByArea;
