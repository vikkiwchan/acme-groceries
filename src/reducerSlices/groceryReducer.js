import { LOAD, UPDATE, CREATE } from '../store';

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

export default groceryReducer;
