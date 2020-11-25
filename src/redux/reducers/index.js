import { combineReducers } from 'redux';
import mainPageReducer from './mainPageReducer';
import categoryReducer from './categoryReducer';
import searchReducer from './searchReducer';
import exploreReducer from './exploreReducer';

const rootReducer = combineReducers({
  mainPageReducer,
  categoryReducer,
  searchReducer,
  exploreReducer,
});

export default rootReducer;
