import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const CategoriesComidas = () => {
  const { apiValueSearch, setApiValueSearch, categories } = useContext(ContextAPI);

  const filterApiValueSearch = async (value) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
    .then((foods) => foods.json())
    .then((foods) => setApiValueSearch({ ...apiValueSearch, foods }));

  return !categories.meals ? (
    <p>loading</p>
  ) : (
    <div>
      {categories.meals.map((element, index) => {
        const number = 4;
        if (index <= number) {
          return (
            <div>
              <button
                key={ element.idCategory }
                type="button"
                name={ element.strCategory }
                data-testid={ `${element.strCategory}-category-filter` }
                onClick={ (e) => filterApiValueSearch(e.target.name) }
              >
                { element.strCategory }
              </button>
            </div>

          );
        }
        return '';
      })}
    </div>);
};

export default CategoriesComidas;
