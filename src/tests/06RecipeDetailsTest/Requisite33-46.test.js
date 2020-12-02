import React from 'react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

describe('33 - Implemente os elementos da tela de detalhes '
  + 'de uma receita de COMIDAS respeitando os atributos descritos no protótipo', () => {
  it('A tela de comida possui todos os atributos data-testid', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const recipePhoto = await findByTestId('recipe-photo');

    expect(recipePhoto).toBeInTheDocument();
  });

  it('O título deve possuir o atributo data-testid="recipe-title"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const recipeTitle = await findByTestId('recipe-title');

    expect(recipeTitle).toBeInTheDocument();
    // console.log(recipeTitle.outerHTML);
  });

  it('O botão de compartilhar deve possuir '
    + 'o atributo data-testid="share-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const shareButton = await findByTestId('share-btn');

    expect(shareButton).toBeInTheDocument();
  });

  it('O botão de favoritar deve possuir o '
    + 'atributo data-testid="favorite-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const favoriteButton = await findByTestId('favorite-btn');

    expect(favoriteButton).toBeInTheDocument();
  });

  it('O texto da categoria deve possuir '
    + 'o atributo data-testid="recipe-category"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const recipeCategory = await findByTestId('recipe-category');

    expect(recipeCategory).toBeInTheDocument();
  });

  it('Os ingredientes devem possuir o atributo '
    + 'data-testid="index-ingredient-name-and-measure"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const ingredientNameAndMeasure1 = await findByTestId('1-ingredient-name-and-measure');
    const ingredientNameAndMeasure2 = await findByTestId('2-ingredient-name-and-measure');
    const ingredientNameAndMeasure3 = await findByTestId('3-ingredient-name-and-measure');
    const ingredientNameAndMeasure4 = await findByTestId('4-ingredient-name-and-measure');
    const ingredientNameAndMeasure5 = await findByTestId('5-ingredient-name-and-measure');
    const ingredientNameAndMeasure6 = await findByTestId('6-ingredient-name-and-measure');

    expect(ingredientNameAndMeasure1).toBeInTheDocument();
    expect(ingredientNameAndMeasure2).toBeInTheDocument();
    expect(ingredientNameAndMeasure3).toBeInTheDocument();
    expect(ingredientNameAndMeasure4).toBeInTheDocument();
    expect(ingredientNameAndMeasure5).toBeInTheDocument();
    expect(ingredientNameAndMeasure6).toBeInTheDocument();
  });

  it('O texto de instruções deve possuir o '
    + 'atributo data-testid="instructions"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const instructions = await findByTestId('instructions');

    expect(instructions).toBeInTheDocument();
  });

  it('O vídeo, presente somente na tela de comidas, '
    + 'deve possuir o atributo data-testid="video"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/53026');

    expect(history.location.pathname).toBe('/comidas/53026');
    const video = await findByTestId('video');

    expect(video).toBeInTheDocument();
  });

  it('O card de receitas recomendadas deve possuir o '
    + 'atributo data-testid="index-recomendation-card"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/53026');

    expect(history.location.pathname).toBe('/comidas/53026');
    const recomendationCard0 = await findByTestId('0-recomendation-card');
    const recomendationCard1 = await findByTestId('1-recomendation-card');

    expect(recomendationCard0).toBeInTheDocument();
    expect(recomendationCard1).toBeInTheDocument();
  });

  it('O botão de iniciar receita deve possuir o '
    + 'atributo data-testid="start-recipe-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/53026');

    expect(history.location.pathname).toBe('/comidas/53026');
    const startRecipeButton = await findByTestId('start-recipe-btn');

    expect(startRecipeButton).toBeInTheDocument();
  });
});

describe('33.1 - Implemente os elementos da tela de detalhes '
  + 'de uma receita de BEBIDAS respeitando os atributos descritos no protótipo', () => {
  it('A tela de comida possui todos os atributos data-testid', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const recipePhoto = await findByTestId('recipe-photo');

    expect(recipePhoto).toBeInTheDocument();
  });

  it('O título deve possuir o atributo data-testid="recipe-title"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const recipeTitle = await findByTestId('recipe-title');

    expect(recipeTitle).toBeInTheDocument();
    // console.log(recipeTitle.outerHTML);
  });

  it('O botão de compartilhar deve possuir '
    + 'o atributo data-testid="share-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const shareButton = await findByTestId('share-btn');

    expect(shareButton).toBeInTheDocument();
  });

  it('O botão de favoritar deve possuir o '
    + 'atributo data-testid="favorite-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const favoriteButton = await findByTestId('favorite-btn');

    expect(favoriteButton).toBeInTheDocument();
  });

  it('O texto da categoria deve possuir '
    + 'o atributo data-testid="recipe-category"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const recipeCategory = await findByTestId('recipe-category');

    expect(recipeCategory).toBeInTheDocument();
  });

  it('Os ingredientes devem possuir o atributo '
    + 'data-testid="index-ingredient-name-and-measure"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const ingredientNameAndMeasure1 = await findByTestId('1-ingredient-name-and-measure');
    const ingredientNameAndMeasure2 = await findByTestId('2-ingredient-name-and-measure');

    expect(ingredientNameAndMeasure1).toBeInTheDocument();
    expect(ingredientNameAndMeasure2).toBeInTheDocument();
  });

  it('O texto de instruções deve possuir o '
    + 'atributo data-testid="instructions"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const instructions = await findByTestId('instructions');

    expect(instructions).toBeInTheDocument();
  });

  it('O card de receitas recomendadas deve possuir o '
    + 'atributo data-testid="index-recomendation-card"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const recomendationCard0 = await findByTestId('0-recomendation-card');
    const recomendationCard1 = await findByTestId('1-recomendation-card');

    expect(recomendationCard0).toBeInTheDocument();
    expect(recomendationCard1).toBeInTheDocument();
  });

  it('O botão de iniciar receita deve possuir o '
    + 'atributo data-testid="start-recipe-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const startRecipeButton = await findByTestId('start-recipe-btn');

    expect(startRecipeButton).toBeInTheDocument();
  });
});
