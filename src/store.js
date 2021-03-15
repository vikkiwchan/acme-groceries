import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPES
const LOAD = 'LOAD';
const UPDATE = 'UPDATE';
const CREATE = 'CREATE';
const SET_VIEW = 'SET_VIEW';

// ACTION CREATOR
const createdGrocery = (grocery) => ({
  type: CREATE,
  grocery,
});

const updatedGrocery = (updated) => ({
  type: UPDATE,
  grocery: updated,
});

// THUNKS
export const createGrocery = (name) => {
  return async (dispatch) => {
    let grocery;
    if (name === 'random') {
      grocery = (await axios.post('/api/groceries/random')).data;
    } else {
      grocery = (await axios.post('/api/groceries', { name })).data;
    }
    dispatch(createdGrocery(grocery));
  };
};

export const updateGrocery = (grocery) => {
  return async (dispatch) => {
    const updated = (
      await axios.put(`/api/groceries/${grocery.id}`, {
        purchased: !grocery.purchased,
      })
    ).data;
    dispatch(updatedGrocery(updated));
  };
};

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
  applyMiddleware(logger, thunkMiddleware)
);

export default store;
