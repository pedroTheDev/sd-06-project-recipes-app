import React from 'react';
import Header from '../components/Header';

const ReceitasFeitas = () => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return ((!recipes)
    ? <h1>No Recipes Yet!</h1>
    : (
      <section>
        <Header title="Receitas Feitas" />
        <div>
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
        {recipes.map((recipe, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt=""
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.category}
            </p>
            <h3
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </h3>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              // onClick={ copyToCB }
            >
              Compartilhar
            </button>
            {recipe.tags.map((tagName, indx) => (
              <div
                key={ indx }
                data-testid={ `${indx}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </div>
            ))}
          </div>
        ))}
      </section>
    )
  );
};

export default ReceitasFeitas;
