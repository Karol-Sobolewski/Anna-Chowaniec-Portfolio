import { createStore } from 'redux';
import state from './initialState';

const reducer = function (state, action) { //eslint-disable-line
  return state;
};

const store = createStore(
  reducer,
  state,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
