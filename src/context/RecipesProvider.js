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
  const [recipeCategory, setRecipeCategory] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeVideo, setRecipeVideo] = useState('');
  const [recipeRecomendations, setRecipeRecomendations] = useState([]);
  const recipeObject = { recipeTitle,
    setRecipeTitle,
    recipeImage,
    setRecipeImage,
    recipeCategory,
    setRecipeCategory,
    recipeIngredients,
    setRecipeIngredients,
    recipeInstructions,
    setRecipeInstructions,
    recipeVideo,
    setRecipeVideo,
    recipeRecomendations,
    setRecipeRecomendations,
  };
  const [recipesDone, setRecipesDone] = useState([]);

  const providerValue = {
    selectedApiEndpoint,
    setSelectedApiEndpoint,
    searchTerm,
    setSearchTerm,
    fetchedResults,
    setFetchedResults,
    isFetching,
    setIsFetching,
    recipeObject,
    recipesDone,
    setRecipesDone,
    selectedCategory,
    setSelectedCategory,
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
