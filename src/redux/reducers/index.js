import { combineReducers } from 'redux';
import mainPageReducer from './mainPageReducer';
import categoryReducer from './categoryReducer';
import searchReducer from './searchReducer';
import recomendationsReducer from './recomendationsReducer';

const rootReducer = combineReducers(
  { mainPageReducer,
    categoryReducer,
    searchReducer,
    recomendationsReducer,
  },
);

export default rootReducer;
