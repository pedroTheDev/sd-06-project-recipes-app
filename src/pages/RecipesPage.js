import React from 'react';
import * as cocktailAPI from '../services/cocktailAPI';
import * as mealAPI from '../services/mealAPI';

class RecipesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      recipes: [],
      categories: [],
    };
  }

  componentDidMount() {
    const { type } = this.state;
    this.loadRecipes(type);
  }

  async loadRecipes(type) {
    if (type === 'cocktails') {
      const recipes = await cocktailAPI.searchByName('');
      const categories = await cocktailAPI.listCategories();
      this.setState({
        recipes: recipes.drinks,
        categories: categories.drinks,
      });

    } else if (type === 'meals') {
      const recipes = await mealAPI.searchByName('');
      this.setState({ recipes: recipes.meals });
    }
  }

  render() {
    const { recipes, type, categories } = this.state;
    const twelve = 12;
    const zero = 0;

    if (recipes.length === zero) {
      console.log(0);
      return <h2>Carregando...</h2>;
    }
    console.log(recipes);
    return (
      <div>
        <div className="categoriesButtons">
          {categories.map((category, index) => {
            const dataTestID = `${category}-category-filter`;
            if (type === 'cocktails') {
              return (
                <div key={index}>
                  <input
                    type="button"
                    data-testid={dataTestID}
                  />
                <div>
              );
            }
          })}
        </div>
        <div className="recipes-section">
          {recipes.map((recipe, index) => {
            if (index < twelve) {
              if (type === 'cocktails') {
                return (
                  <div className="recipe-card" key={ index }>
                    <img
                      alt="Drink Thumb"
                      src={ recipe.strDrinkThumb }
                      className="recipe-thumb"
                      height="200"
                    />
                    <h2 className="recipe-name">{recipe.strDrink}</h2>
                  </div>
                );
              }
              if (type === 'meals') {
                return (
                  <div className="recipe-card" key={ index }>
                    <img
                      alt="Meal Thumb"
                      src={ recipe.strMealThumb }
                      className="recipe-thumb"
                      height="200"
                    />
                    <h2 className="recipe-name">{recipe.strMeal}</h2>
                  </div>
                );
              }
            }
            return <div key={ index } />;
          })}
        </div>
      </div>
    );
  }
}

export default RecipesPage;
