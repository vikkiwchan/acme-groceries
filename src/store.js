import { createStore } from 'redux';

const initialState = {
  groceries: [],
  view: ''
};
const store = createStore((state = initialState, action)=> {
  if(action.type === 'LOAD'){
    state = {...state, groceries: action.groceries };
  }
  if(action.type === 'SET_VIEW'){
    state = {...state, view: action.view};
  }
  return state;
});

export default store;


