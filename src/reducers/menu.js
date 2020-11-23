import { DRINKS, MEALS } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
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
  default:
    return state;
  }
}
