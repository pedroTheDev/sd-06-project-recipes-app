import { DRINKS, MEALS, CURRENT_ID } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  currentID: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINKS:
    return {
      ...state, drinks: action.drink,
    };
  case MEALS:
    return {
      ...state, meals: action.meal,
    };
  case CURRENT_ID:
    return {
      ...state, currentID: action.id,
    };
  default:
    return state;
  }
}
