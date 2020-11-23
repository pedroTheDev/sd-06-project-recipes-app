import React, { useState, useEffect, useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';
import { searchFoodIngredients } from '../../services/aPI';

const ResultsAPI = () => {
  const { apiValueSearch } = useContext(ContextAPI);

  const verificationAPI = async () => {
    const result = await searchFoodIngredients(apiValueSearch[0]);
    console.log(result);
  };

  return apiValueSearch.length === 2 ? (
    () => verificationAPI()
  ) : (<p>loaging</p>);
};

export default ResultsAPI;
