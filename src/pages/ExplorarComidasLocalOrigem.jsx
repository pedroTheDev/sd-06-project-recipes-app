import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';
import Lupa from '../Components/Lupa';
import Footer from '../Components/Footer';
import FoodCard from '../Components/FoodCard';
import * as api from '../services/Api';

export default function ExplorarComidasLocalOrigem() {
  const {
    titulo,
    setTitulo,
    loading,
    setLoading,
    mealsByArea,
    setMealsByArea } = useContext(Context);
  const [areas, setAreas] = useState([]);

  const fetchAreas = async () => {
    setLoading(true);
    const response = await api.fetchMealsByArea();
    setAreas(response);
    console.log(response);
    setLoading(false);
  };

  useEffect(() => {
    setTitulo('Explorar Origem');
    fetchAreas();
  }, []);

  const onChange = async ({ target }) => {
    setLoading(true);
    const response = await api.fetchFoodByArea(target.value);
    setMealsByArea(response);
    setLoading(false);
  };

  return (
    <div>
      <Header titulo={ titulo } />
      <Lupa />
      {loading ? <p>Loading</p>
        : (
          <div>
            <select
              data-testid="explore-by-area-dropdown"
              onChange={ onChange }
            >
              <option key="all" value="">All</option>
              {areas.map((area, index) => (
                <option
                  key={ index }
                  value={ area.strArea }
                  data-testid={ `${area.strArea}-option` }
                >
                  {area.strArea}
                </option>))}
            </select>
            {mealsByArea.map((meal, index) => (
              <FoodCard key={ meal.idMeal } food={ meal } index={ index } />))}
          </div>
        )}
      <Footer />
    </div>
  );
}
