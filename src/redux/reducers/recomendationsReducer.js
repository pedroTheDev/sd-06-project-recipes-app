import {
  SUCCESS_RECOMMENDATIONS,
  ERROR_RECOMMENDATIONS,
  LOADING_RECOMMENDATIONS,
} from '../actions/pageDetailsFetcher';

const INITIAL_STATE = {
  recomendations: [],
  error: '',
  loading: false,
};

export default function recomendationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_RECOMMENDATIONS:
    return { ...state, loading: true };
  case SUCCESS_RECOMMENDATIONS:
    return { ...state, recomendations: action.payload };
  case ERROR_RECOMMENDATIONS:
    return { ...state, error: action.failed };
  default:
    return state;
  }
}
