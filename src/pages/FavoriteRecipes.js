import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './DoneAndFavoriteRecipes.css';

const FavoriteRecipes = () => {
  const { setTitle } = useContext(HeaderContext);
  const [copiedPath, setCopiedPath] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [recipesList, setRecipesList] = useState('');
  const [filter, setFilter] = useState('All');

  const getInformationFromLocalStorage = () => {
    const listOfFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipesList(listOfFavoriteRecipes);
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

  const unLikeRecipe = (recipeID) => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const unSave = recipes.filter((item) => item.id !== recipeID);
    localStorage.setItem('favoriteRecipes', JSON.stringify(unSave));
  };

  const handleImage = (recipeID) => {
    unLikeRecipe(recipeID);
    getInformationFromLocalStorage();
  };

  useEffect(() => {
    setTitle('Receitas Favoritas');
    getInformationFromLocalStorage();
  }, []);

  useEffect(() => {
    if (recipesList) {
      setIsLoading(false);
    }
  }, [recipesList]);

  return (
    <div className="done-recipes-container">
      <div className="type-btn-container">
        <button
          type="button"
          name="all"
          onClick={ handleFilter }
          data-testid="filter-by-all-btn"
          className="type-btn"
        >
          All
        </button>
        <button
          type="button"
          name="foods"
          onClick={ handleFilter }
          data-testid="filter-by-food-btn"
          className="type-btn"
        >
          Food
        </button>
        <button
          type="button"
          name="drinks"
          onClick={ handleFilter }
          data-testid="filter-by-drink-btn"
          className="type-btn"
        >
          Drinks
        </button>
      </div>
      {
        isLoading ? <p>Loading</p> : handleSelectedFilter()
          .map((recipe, index) => {
            if (recipe.type === 'comida') {
              return (
                <div key={ recipe.id } className="done-recipe-card">
                  <Link to={ `/comidas/${recipe.id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.name }
                      className="done-recipe-image"
                    />
                    <h2
                      data-testid={ `${index}-horizontal-name` }
                      className="done-recipe-name"
                    >
                      { recipe.name }
                    </h2>
                  </Link>
                  <h3
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${recipe.area} - ${recipe.category}` }
                  </h3>
                  <div className="share-btn-container">
                    <button
                      type="button"
                      onClick={ () => handleImage(recipe.id) }
                      className="share-btn"
                    >
                      <img
                        src={ fullLikeIcon }
                        alt="like"
                        data-testid={ `${index}-horizontal-favorite-btn` }
                      />
                    </button>
                    <button
                      type="button"
                      onClick={ () => handleShare(recipe.id, recipe.type) }
                      className="share-btn"
                    >
                      <img
                        src={ shareIcon }
                        alt="share"
                        data-testid={ `${index}-horizontal-share-btn` }
                      />
                    </button>
                    { copiedPath && <p className="share-text">Link copiado!</p> }
                  </div>
                </div>
              );
            }
            return (
              <div key={ recipe.id } className="done-recipe-card">
                <Link to={ `/bebidas/${recipe.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    className="done-recipe-image"
                  />
                  <h2
                    data-testid={ `${index}-horizontal-name` }
                    className="done-recipe-name"
                  >
                    { recipe.name }
                  </h2>
                </Link>
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.alcoholicOrNot }
                </h3>
                <div className="share-btn-container">
                  <button
                    type="button"
                    onClick={ () => handleShare(recipe.id, recipe.type) }
                    className="share-btn"
                  >
                    <img
                      src={ shareIcon }
                      alt="share"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                  { copiedPath && <p className="share-text">Link copiado!</p> }
                  <button
                    type="button"
                    onClick={ () => handleImage(recipe.id) }
                    className="share-btn"
                  >
                    <img
                      src={ fullLikeIcon }
                      alt="like"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
              </div>
            );
          })
      }
    </div>
  );
};

export default FavoriteRecipes;
