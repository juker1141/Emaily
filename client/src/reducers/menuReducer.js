import { TOGGLE_MENU, CLOSE_MENU } from '../actions/types';

export default function menuReducer(state = false, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return state = !state;
    case CLOSE_MENU:
      return state = false;
    default:
      return state;
  };
};