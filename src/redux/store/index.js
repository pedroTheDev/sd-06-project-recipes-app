import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;

// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import listReducer from '../reducers';

// const rootReducer = combineReducers({ listReducer });

// // aplique o middleware
// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
// );

// export default store;
