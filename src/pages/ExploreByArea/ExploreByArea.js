import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import BtnSearchBar from '../../components/BtnSearchBar';
import Footer from '../../components/Footer';
import { listByArea } from '../../services/mealAPI';

function ExploreByArea() {
  const [area, setArea] = useState({});

  const fetchByArea = async () => {
    const areas = await listByArea();
    console.log(areas);
    setArea(areas);
  };

  useEffect(() => {
    fetchByArea();
  }, []);

  const renderArea = () => (
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
  );

  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Origem"
        BtnSearchBar={ BtnSearchBar }
      />
      <div className="drop-down-container">
        {renderArea()}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreByArea;
