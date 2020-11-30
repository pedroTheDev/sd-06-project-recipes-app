import React, { useEffect } from 'react';
import Header from '../components/Header';
import './ReceitasFeitas.css';

import shareIcon from '../images/shareIcon.svg';

const ReceitasFeitas = () => {
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
                    <button type="button">
                      <img
                        data-testid={ `${i}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="shareIcon"
                      />
                    </button>
                  </div>
                  <div className="middle-informations">
                    <span
                      data-testid={ `${i}-horizontal-name` }
                    >
                      { infoFoof.name }
                    </span>
                    <p
                      data-testid={ `${i}-horizontal-done-date` }
                    >
                      Feita em: 29/10/2020
                    </p>
                  </div>
                  <div className="container-tags">
                    <span
                      data-testid={ `${i}-${infoFoof[0]}-horizontal-tag` }
                    >
                      tag
                    </span>
                    <span>tag</span>
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

export default ReceitasFeitas;
