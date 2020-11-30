import React, { useEffect } from 'react';
import Header from '../components/Header';
import './ReceitasFeitas.css';
import './ReceitasFavoritas.css';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const ReceitasFavoritas = () => {
  const handleRecipeLocalStorage = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      const doneRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    } else {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      console.log(doneRecipes);

      return doneRecipes;
    }
  };

  useEffect(() => {
    handleRecipeLocalStorage();
  }, []);

  return (
    <div>

      <Header />
      <div className="main-recaipe-made">
        <div className="container-button-recipe-made">
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        <div className="container-cards">
          { handleRecipeLocalStorage() && (
            handleRecipeLocalStorage().map((infoFoof, i) => (
              <div
                key={ i }
                className="main-card"
              >
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ infoFoof.photoFood }
                  alt={ infoFoof.name }
                />
                <div className="container-informations">
                  <div className="top-informations">
                    <span
                      data-testid={ `${i}-horizontal-top-text` }
                    >
                      { infoFoof.category }
                    </span>
                  </div>
                  <div className="middle-informations">
                    <span
                      data-testid={ `${i}-horizontal-name` }
                    >
                      { infoFoof.name }
                    </span>
                  </div>
                  <div className="container-buttons">
                    <button type="button">
                      <img
                        data-testid={ `${i}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="shareIcon"
                      />
                    </button>
                    <button type="button">
                      <img
                        data-testid={ `${i}-horizontal-share-btn` }
                        src={ blackHeartIcon }
                        alt="blackHeartIcon"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) }
        </div>
      </div>
    </div>
  );
};

export default ReceitasFavoritas;
