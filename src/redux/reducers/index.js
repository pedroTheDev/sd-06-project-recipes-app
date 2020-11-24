import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import mainPageReducer from './mainPageReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({ exampleReducer, mainPageReducer, categoryReducer });

export default rootReducer;
