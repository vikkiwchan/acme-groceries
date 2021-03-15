import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

// ACTION TYPES
const LOAD = 'LOAD';
const UPDATE = 'UPDATE';
const CREATE = 'CREATE';
const SET_VIEW = 'SET_VIEW';

// REDUCER SLICES
const groceryReducer = (state = [], action) => {
  if (action.type === LOAD) {
    return action.groceries;
  }
  if (action.type === UPDATE) {
    return state.map((grocery) =>
      grocery.id === action.grocery.id ? action.grocery : grocery
    );
  }
  if (action.type === CREATE) {
    return state.concat(action.grocery);
  } else return state;
};

const viewReducer = (state = '', action) => {
  if (action.type === SET_VIEW) {
    return action.view;
  } else return state;
};

const store = createStore(
  combineReducers({
    groceries: groceryReducer,
    view: viewReducer,
  }),
  applyMiddleware(logger)
);

export default store;
