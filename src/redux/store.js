import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import menuReducer from './menuRedux';
import photoReducer from './photoRedux';
import categoryReducer from './categoryRedux';
import offerReducer from './offerRedux';
import descriptionReducer from './descriptionRedux';

const reducers = {
  menu: menuReducer,
  photos: photoReducer,
  categories: categoryReducer,
  offers: offerReducer,
  descriptions: descriptionReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach((item) => {
  if (item) {
    if (typeof reducers[item] === `undefined`) {
      reducers[item] = (statePart = null) => statePart;
    }
  }
});

const combinedReducers = combineReducers(reducers);

// create store
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
