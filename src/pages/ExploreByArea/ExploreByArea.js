import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import BtnSearchBar from '../../components/BtnSearchBar';
import Footer from '../../components/Footer';
import { listByArea } from '../../services/mealAPI';

function ExploreByArea() {
  const [areas, setAreas] = useState({});

  const fetchByArea = async () => {
    const result = await listByArea();
    setAreas(result.meals);
    console.log('result:', result);
    console.log('areas:', areas);
  };

  useEffect(() => {
    fetchByArea();
    console.log(areas);
  }, []);

  const renderSelect = () => (
    <select
      data-testid="explore-by-area-dropdown"
      className="area-select"
      name="area"
    >
      {/* {areas.meals.map((area) => {
        <option data-testid={ `${area}-option` } value={ area.strArea }>
          {area.strArea}
        </option>;
      })} */}
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
        {renderSelect()}
        <select
          data-testid="explore-by-area-dropdown"
          className="area-select"
          name="area"
        >
          {/* <option data-testid={ `${areas.meals[0]}-option` } value={ areas.meals[0].strArea }>
            {areas.meals[0].strArea}
          </option> */}
        </select>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreByArea;
