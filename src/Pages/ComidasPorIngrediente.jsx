import React, { useEffect, useState } from 'react';

import { exploreByIngredients, imageOfIngredients } from '../services/aPI';
import './ComidasPorIngrediente.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

const ComidasPorIngrediente = () => {
  const [stateIngredients, setStateIngredients] = useState();
  const [stateUrlImage, setUrlImage] = useState({ url: [] });

  const searchForIngredients = async () => {
    const ingredients = await exploreByIngredients();

    setStateIngredients(ingredients);
  };

  const searchImageOfIngredients = async (nameIngredient) => {
    const urlImages = [];

    urlImages.push(await imageOfIngredients(nameIngredient)
      .then((res) => res.url));

    // console.log(urlImages);

    setUrlImage({
      url: [
        ...stateUrlImage.url,
        urlImages,
      ],
    });

    return urlImages;
  };

  const numberOfIngredients = 11;

  const searchImage = () => {
    if (stateIngredients) {
      stateIngredients.meals
        .filter(((ingred, i) => i <= numberOfIngredients))
        .map((res) => res.strIngredient)
        .map((ingredNome) => {
          // console.log(ingredNome);
          searchImageOfIngredients(ingredNome);
        });
    }
    return '';
    // console.log('false');
  };

  useEffect(() => {
    searchImage();
  }, [stateIngredients]);

  useEffect(() => {
    searchForIngredients();
  }, []);

  return (
    <div>
      {stateUrlImage && console.log(stateUrlImage.url)}
      <Header />
      <div className="main-ingredients">
        {!stateIngredients ? <div>Loading...</div>
          : stateIngredients.meals.map((ingred, i) => (
            numberOfIngredients >= i
            && (
              <div
                key={ i }
                className="container-ingredients"
                data-testid={ `${i}-ingredient-card` }
              >
                <span
                  data-testid={ `${i}-card-name` }
                >
                  {ingred.strIngredient}
                </span>
                <img
                  src=""
                  alt="kkk"
                />
              </div>
            )
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default ComidasPorIngrediente;
