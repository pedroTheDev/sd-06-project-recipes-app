import React, { useEffect, useState } from 'react';

import '../css/Cards.css';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storage) {
      setRecipes(storage);
    }
  }, []);

  return (
    <section>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      { (recipes)
        ? (
          <section className="cards-wrapper">
            { recipes.map((recipe, index) => (
              <section key={ recipe.id } className="item-card">
                <img
                  src={ recipe.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt="card"
                />
                <h4 data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</h4>
                <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
                <span data-testid={ `${index}-horizontal-done-date` }>
                  { recipe.doneDate }
                </span>
                <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
                  Compartilhar
                </button>
                { (recipe.tags !== null)
                  && (Array.isArray(recipe.tags))
                  ? recipe.tags.map((tag) => (
                    <h4
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      { tag }
                    </h4>
                  ))
                  : recipe.tags }
              </section>
            )) }
          </section>
        )
        : <div>Loading. . .</div> }
    </section>
  );
}
