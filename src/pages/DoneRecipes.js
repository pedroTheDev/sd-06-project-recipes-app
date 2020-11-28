import React, { useState, useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';
import shareIcon from '../images/shareIcon.svg';

const DoneRecipes = () => {
  const { setTitle } = useContext(HeaderContext);
  const [copiedPath, setCopiedPath] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [recipesList, setRecipesList] = useState('');
  const [filter, setFilter] = useState('All');

  const getInformationFromLocalStorage = () => {
    const listOfDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipesList(listOfDoneRecipes);
  };

  const handleShare = (id, type) => {
    let completePath = '';
    if (type === 'comida') {
      completePath = `http://localhost:3000/comidas/${id}`;
    } else if (type === 'bebida') {
      completePath = `http://localhost:3000/bebidas/${id}`;
    }

    navigator.clipboard.writeText(completePath);
    setCopiedPath(completePath);
  };

  const handleSelectedFilter = () => {
    if (filter === 'foods') {
      return recipesList.filter((recipe) => recipe.type === 'comida');
    }
    if (filter === 'drinks') {
      return recipesList.filter((recipe) => recipe.type === 'bebida');
    }
    return recipesList;
  };

  const handleFilter = ({ target: { name } }) => {
    setFilter(name);
  };

  useEffect(() => {
    setTitle('Receitas Feitas');
    getInformationFromLocalStorage();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [recipesList]);

  return (
    <div>
      <button
        type="button"
        name="all"
        onClick={ handleFilter }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        name="foods"
        onClick={ handleFilter }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        name="drinks"
        onClick={ handleFilter }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        isLoading ? <p>Loading</p> : handleSelectedFilter()
          .map((recipe, index) => {
            if (recipe.type === 'comida') return (
              <div key={ recipe.id }>
                <img data-testid={ `${index}-horizontal-image` } src={ recipe.image } />
                <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
                <h3 data-testid={ `${index}-horizontal-top-text` }>{ recipe.type }</h3>
                <h3 data-testid={ `${index}-horizontal-category` }>{ recipe.category }</h3>
                <h3 data-testid={ `${index}-horizontal-area` }>{ recipe.area }</h3>
                <h3 data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</h3>
                {
                  recipe.tags.map((tag, tagIndex) => {
                    if (tagIndex < 2) {
                      return (
                        <h4
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          { tag }
                        </h4>
                      )
                    }
                  })
                }
                <button type="button" onClick={ () => handleShare(recipe.id, recipe.type) }>
                  <img
                    src={ shareIcon }
                    alt="share"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                { copiedPath && <p>Link copiado!</p> }
              </div>
            )
            if (recipe.type === 'bebida') return (
              <div key={ recipe.id }>
                <img data-testid={ `${index}-horizontal-image` } src={ recipe.image } />
                <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
                <h3 data-testid={ `${index}-horizontal-top-text` }>{ recipe.type }</h3>
                <h3 data-testid={ `${index}-horizontal-alcoholic` }>{ recipe.alcoholicOrNot }</h3>
                <h3 data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</h3>
                <button type="button" onClick={ () => handleShare(recipe.id, recipe.type) }>
                  <img
                    src={ shareIcon }
                    alt="share"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                { copiedPath && <p>Link copiado!</p> }
              </div>
            )
      })}
    </div>
  );
};

export default DoneRecipes;
