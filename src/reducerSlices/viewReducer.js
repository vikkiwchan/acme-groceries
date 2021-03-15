import { SET_VIEW } from '../store';

const viewReducer = (state = '', action) => {
  if (action.type === SET_VIEW) {
    return action.view;
  } else return state;
};

export default viewReducer;
