import React from 'react';
// TIREI O BOOTSTRAP DO CAROUSEL DAQUI
// https://getbootstrap.com/docs/4.0/components/carousel/#with-controls
// O MAP QUE FORMOS FAZER TEM QUE PEGAR AS PRIMEIRAS 6 RECEITAS QUE ENCONTRAR DA API

export default function RecommendedRecipes() {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="meals[0].strMealThumb"
            alt="{...strMeal} recipe"
          />
          {/* NO CASO DE BEBIDAS A CATEGORIA VAI SER
          SUBSTITUIDA P ALCOOLICO OU NAO strAlcoholic */}
          <h6 data-testid="recipe-category">.strCategory</h6>
          <h1>...strMeal</h1>
        </div>
        {/* TALVEZ AQUI TEM QUE SER ITEM-ATCTIVE PARA MOSTRAR OS 2 DOIS NA TELA */}
        <div className="carousel-item">
          <img
            src="meals[1].strMealThumb"
            alt="{...strMeal} recipe"
          />
          {/* NO CASO DE BEBIDAS A CATEGORIA VAI SER
          SUBSTITUIDA P ALCOOLICO OU NAO strAlcoholic */}
          <h6 data-testid="recipe-category">.strCategory</h6>
          <h1>...strMeal</h1>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

// A pagina de detalhes de receita deverá fazer um API de search para renderizar as tags
// 36 - Implemente as recomendações, para receitas de comida, a recomendação deverá ser bebida e vice-versa
// Observações técnicas

// Verifica se a requisição para a API de bebidas foi realizada. O endpoint utilizado deve ser
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=;
// Verifica se a requisição para a API de comidas foi realizada. O endpoint utilizado deve ser
//  https://www.themealdb.com/api/json/v1/1/search.php?s=.

// 37 - Implemente os cards de recomendação, onde serão 6 cards, mas mostrando apenas 2 e o
// scroll é horizontal, similar a um carousel
