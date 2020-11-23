import React from 'react';
import * as cocktailAPI from '../../services/cocktailAPI';
import * as mealAPI from '../../services/mealAPI';

class RecipesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      recipes: [],
      categories: [],
      filter: '',
    };

    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    const { type } = this.state;
    this.loadRecipes(type);
    if (window.location.href === 'http://localhost:3000/comidas') {
      this.setRecipesType('meals');
    } else if (window.location.href === 'http://localhost:3000/bebidas') {
      this.setRecipesType('cocktails');
    }
  }

  componentDidUpdate() {
    const { type } = this.state;
    this.loadRecipes(type);
  }

  setRecipesType(type) {
    this.setState({ type });
  }

  setFilter({ target }) {
    this.setState({ filter: target.value });
  }

  async loadRecipes(type) {
    const { filter } = this.state;
    let recipes = {};
    if (type === 'cocktails') {
      if (filter !== '') {
        recipes = await cocktailAPI.filterByCategory(filter);
      } else {
        recipes = await cocktailAPI.searchByName('');
      }
      const categories = await cocktailAPI.listCategories();
      this.setState({
        recipes: recipes.drinks,
        categories: categories.drinks,
      });
    } else if (type === 'meals') {
      if (filter !== '') {
        recipes = await mealAPI.filterByCategory(filter);
      } else {
        recipes = await mealAPI.searchByName('');
      }
      const categories = await mealAPI.listCategories();
      this.setState({
        recipes: recipes.meals,
        categories: categories.meals,
      });
    }
  }

  render() {
    const { recipes, type, categories } = this.state;
    const twelve = 12;
    const zero = 0;
    const five = 5;

    if (recipes.length === zero || categories.length === zero) {
      console.log(0);
      return <h2>Carregando...</h2>;
    }
    console.log(recipes);
    return (
      <div className="recipes-page">
        <div className="categories">
          {categories.map((category, index) => {
            const dataTestID = `${category.strCategory}-category-filter`;
            if (index < five) {
              if (type === 'cocktails') {
                return (
                  <div className="category-button" key={ index }>
                    <input
                      type="button"
                      data-testid={ dataTestID }
                      value={ category.strCategory }
                      onClick={ this.setFilter }
                    />
                  </div>
                );
              }
              if (type === 'meals') {
                return (
                  <div className="category-button" key={ index }>
                    <input
                      type="button"
                      data-testid={ dataTestID }
                      value={ category.strCategory }
                      onClick={ this.setFilter }
                    />
                  </div>
                );
              }
            }
            return <div key={ index } />;
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
