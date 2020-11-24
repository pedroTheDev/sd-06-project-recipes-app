
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import searchRecipesReducer from './reducers/searchRecipes';



const composedThunk = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
);


const rootReducer = combineReducers({
  login: loginReducer,
  searchRecipes: searchRecipesReducer });



export default recipesStore;
