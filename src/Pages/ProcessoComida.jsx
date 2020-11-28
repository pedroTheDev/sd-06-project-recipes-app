import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { detailsFoodById } from '../services/aPI';

const ReceitaProcessoComida = () => {
  const [recipeProgress, setRecipeProgress] = useState();

  const idFood = useParams().id;

  const handleIdInProgress = async () => {
    const recipeById = await detailsFoodById(idFood);

    setRecipeProgress({
      ...recipeProgress,
      food: recipeById,
    });
  };

  useEffect(() => {
    handleIdInProgress();
  }, []);

  return (
    <div>
      falta o loading
      {console.log(recipeProgress.food)}
    </div>
  );
};

export default ReceitaProcessoComida;
