export default function getIngredientUrl(type, ingredient) {
  switch (type) {
    case 'comidas':
      return `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
    case 'bebidas':
      return `https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`;
    default:
      return null;
  }
}
