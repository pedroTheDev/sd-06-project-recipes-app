const INITIAL_STATE = {
  meals: [],
  drinks: [],
};

function mealsAndDrinksReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case 'ADD_MEALS':
    return { ...state, meals: [...payload] };
  case 'ADD_COCKTAIL':
    return { ...state, drinks: [...payload] };
  default:
    return state;
  }
}

export default mealsAndDrinksReducer;
