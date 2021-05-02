import { FETCH_USER } from '../actions/types';

export default function foo(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // 若是空字串，就回傳 false
    default:
      return state;
  }
};