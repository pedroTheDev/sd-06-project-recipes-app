import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import BtnSearchBar from '../../components/BtnSearchBar';
import Footer from '../../components/Footer';
import { listByArea } from '../../services/mealAPI';

function ExploreByArea() {
  const [areas, setAreas] = useState({});

  const fetchByArea = async () => {
    const resultAreas = await listByArea();
    setAreas(resultAreas);
  };

  useEffect(() => {
    fetchByArea();
  }, []);

  const renderSelect = () => {
    <select
      data-testid="explore-by-area-dropdown"
      className="area-select"
      name="area"
    >
      const option = areas.map(area => { <option data-testid={ `${area}-option` } value={ area.strArea }> {area.strArea} </option> })
    </select>;
  };

  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Origem"
        BtnSearchBar={ BtnSearchBar }
      />
      <div className="drop-down-container">
        {renderSelect()}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreByArea;
