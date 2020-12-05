import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import BtnSearchBar from '../../components/BtnSearchBar';
import Footer from '../../components/Footer';
import { listByArea } from '../../services/mealAPI';
import recipesAppContext from '../../context/recipesAppContext';

function ExploreByArea() {
  const { areas, setAreas } = useContext(recipesAppContext);

  const fetchByArea = async () => {
    setAreas(await listByArea());
  };

  useEffect(() => {
    fetchByArea();
  }, []);

  const areaSelect = (meal) => (
    <option
      data-testid={ `${meal}-option` }
      value={ meal.strArea }
    >
      {meal.strArea}
    </option>
  );

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
          {
            areas.meals
              ? areas.meals.map((meal) => areaSelect(meal))
              : <div>Loading...</div>
          }
        </select>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreByArea;
