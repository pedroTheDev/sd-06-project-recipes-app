import { combineReducers } from 'redux';
import mainPageReducer from './mainPageReducer';
import categoryReducer from './categoryReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({ mainPageReducer, categoryReducer, searchReducer });

export default rootReducer;
