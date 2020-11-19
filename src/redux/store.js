import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';

const composedThunk = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
);

const recipesStore = createStore(loginReducer, composedThunk);

export default recipesStore;
