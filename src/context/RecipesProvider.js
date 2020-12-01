import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const RecipesProvider = ({ children }) => {
  const [selectedApiEndpoint, setSelectedApiEndpoint] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedResults, setFetchedResults] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeArea, setRecipeArea] = useState('');
  const [recipeAlc, setRecipeAlc] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeVideo, setRecipeVideo] = useState('');
  const [recipeTags, setRecipeTags] = useState('');
  const [recipeRecommendations, setRecipeRecommendations] = useState([]);
  const [searchByIngredient, setSearchByIngredient] = useState('');
  const recipeObject = {
    recipeTitle,
    setRecipeTitle,
    recipeImage,
    setRecipeImage,
    recipeArea,
    setRecipeArea,
    recipeAlc,
    setRecipeAlc,
    recipeCategory,
    setRecipeCategory,
    recipeIngredients,
    setRecipeIngredients,
    recipeInstructions,
    setRecipeInstructions,
    recipeVideo,
    setRecipeVideo,
    recipeTags,
    setRecipeTags,
  };
  const [recipesDone, setRecipesDone] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState([]);

  const providerValue = {
    recipeObject,
    selectedApiEndpoint,
    setSelectedApiEndpoint,
    searchTerm,
    setSearchTerm,
    fetchedResults,
    setFetchedResults,
    isFetching,
    setIsFetching,
    recipesDone,
    setRecipesDone,
    recipesInProgress,
    setRecipesInProgress,
    selectedCategory,
    setSelectedCategory,
    searchByIngredient,
    setSearchByIngredient,
  };
  return (
    <RecipesContext.Provider value={ providerValue }>
      { children }
    </RecipesContext.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
