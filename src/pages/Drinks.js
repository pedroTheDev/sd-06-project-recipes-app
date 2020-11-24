import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';

const Drinks = ({ history }) => {
  const { title, setTitle } = useContext(HeaderContext);
  const { fetchedResults, isFetching } = useContext(RecipesContext);
  const defaultTypeOfData = {
    groupName: 'drinks',
    idMeal: 'idDrink',
  };

  useEffect(() => {
    setTitle('Bebidas');
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
    if (fetchedResults.drinks) {
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
              <div key={ recipe.idDrink }>
                <p className="meal-title">{ recipe.strDrink }</p>
                <img
                  src={ recipe.strDrinkThumb }
                  className="meal-img"
                  alt={ recipe.strMeal }
                />
                <p className="meal-id">{ recipe.idDrink }</p>
              </div>
            ))
      }
    </div>
  );
};

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Drinks;
