import React, { useState, useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';
import shareIcon from '../images/shareIcon.svg';

const DoneRecipes = () => {
  const { setTitle } = useContext(HeaderContext);
  const [copiedPath, setCopiedPath] = useState();

  const handleShare = () => {
    const completePath = `http://localhost:3000/comidas/${id}`;
    navigator.clipboard.writeText(completePath);
    setCopiedPath(completePath);
  };

  const handleFilter = () => {

  };

  useEffect(() => {
    setTitle('Receitas Feitas');
  }, []);

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
      <div>
        <div>
          <img data-testid={ `${index}-horizontal-image` } src={ recipeImage } />
          <h2 data-testid={ `${index}-horizontal-name` }>{ recipeName }</h2>
          <h3 data-testid={ `${index}-horizontal-top-text` }>{ recipeText }</h3>
          <h3 data-testid={ `${index}-horizontal-done-date` }>{ recipeDoneDate }</h3>
          <h4 data-testid={ `${index}-${tagName}-horizontal-tag` }>{ tagName }</h4>
          <button type="button" onClick={ handleShare }>
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          { copiedPath && <p>Link copiado!</p> }
        </div>
      </div>
    </div>
  );
};

export default DoneRecipes;
