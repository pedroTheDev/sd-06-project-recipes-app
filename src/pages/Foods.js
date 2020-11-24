import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';

const Foods = ({ history }) => {
  const { title, setTitle } = useContext(HeaderContext);
  const { fetchedResults, isFetching } = useContext(RecipesContext);
  const defaultTypeOfData = {
    groupName: 'meals',
    idMeal: 'idMeal',
  };

  useEffect(() => {
    setTitle('Comidas');
  }, []);

  const handleQuantityOfResults = () => {
    const { groupName, idMeal } = defaultTypeOfData;
    const onlyIndex = 0;
    const mealID = fetchedResults[groupName][onlyIndex][idMeal];

    if (fetchedResults[groupName].length === 1) {
      const sendToDetailsPath = `/${title.toLowerCase()}/${mealID}`;
      history.push(sendToDetailsPath);
    }
  };

  useEffect(() => {
    if (!isFetching) {
      handleQuantityOfResults();
    }
  }, [fetchedResults]);

  return (
    <div className="meal-card">
      {
        isFetching
          ? <p>Faça uma Pesquisa</p>
          : fetchedResults[defaultTypeOfData.groupName]
            .map((recipe) => (
              <div key={ recipe.idMeal }>
                <p className="meal-title">{ recipe.strMeal }</p>
                <img
                  src={ recipe.strMealThumb }
                  className="meal-img"
                  alt={ recipe.strMeal }
                />
                <p className="meal-id">{ recipe.idMeal }</p>
              </div>
            ))
      }
    </div>
  );
};

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Foods;
