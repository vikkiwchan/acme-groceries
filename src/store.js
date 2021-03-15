import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import viewReducer from './reducerSlices/viewReducer';
import groceryReducer from './reducerSlices/groceryReducer';

// ACTION TYPES
export const LOAD = 'LOAD';
export const UPDATE = 'UPDATE';
export const CREATE = 'CREATE';
export const SET_VIEW = 'SET_VIEW';

// ACTION CREATORS
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

const store = createStore(
  combineReducers({
    groceries: groceryReducer,
    view: viewReducer,
  }),
  applyMiddleware(logger, thunkMiddleware)
);

export default store;
