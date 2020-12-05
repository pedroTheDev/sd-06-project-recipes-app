import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';

const IngredientDrinks = () => {
  const { title, setTitle } = useContext(HeaderContext);
  const { setSearchByIngredient } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsImg, setIngredientsImg] = useState([]);

  const mountImage = (array) => {
    const path = 'https://www.thecocktaildb.com/images/ingredients/';
    const correctIngredientsNames = array.map((item) => item);
    const correctPaths = correctIngredientsNames
      .map((item) => `${path}${item}-Small.png`);
    setIngredientsImg(correctPaths);
  };

  const fetchIngredients = async () => {
    const path = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const fetchThem = await fetch(path);
    const fetchThemJson = await fetchThem.json();
    const numberOfCards = 12;
    const zero = 0;
    const listOfIngredients = [];
    for (let index = zero; index < numberOfCards; index += 1) {
      listOfIngredients.push(fetchThemJson.drinks[index].strIngredient1);
    }
    setIngredients(listOfIngredients);
    mountImage(listOfIngredients);
  };

  const handleClick = async (item) => {
    const ingredient = item.item;
    setSearchByIngredient(ingredient);
  };

  useEffect(() => {
    setTitle('Explorar Ingredientes');
    fetchIngredients();
  }, []);

  return (
    <div className="main" style={ { backgroundColor: '#FCDCA2' } }>
      <h1 style={ { textAlign: 'center', marginTop: 20 } }>
        { title }
        <div className="ingredient-container" style={ { marginLeft: 10 } }>
          {ingredients.map((item, index) => (
            <Link to="/bebidas" key={ item }>
              <button
                type="button"
                onClick={ () => handleClick({ item }) }
              >
                <div
                  className="ingredient-card"
                  data-testid={ `${index}-ingredient-card` }
                >
                  <img
                    src={ ingredientsImg[index] }
                    alt={ item }
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>{item}</p>
                </div>
              </button>
            </Link>
          ))}
        </div>
      </h1>
    </div>
  );
};

export default IngredientDrinks;
