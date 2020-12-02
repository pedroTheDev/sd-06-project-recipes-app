import React from 'react';
import Header from '../../components/Header';
import BtnSearchBar from '../../components/BtnSearchBar';
import Footer from '../../components/Footer';

function ExploreByArea() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Origem"
        BtnSearchBar={ BtnSearchBar }
      />
      <div className="drop-down-container">
        <select
          data-testid="explore-by-area-dropdown"
          className="area-select"
          name="area"
          value="Area"
        >
          <option
            data-testid="area-option"
          >
            Area
          </option>
        </select>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreByArea;
