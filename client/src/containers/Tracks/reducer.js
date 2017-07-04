import { INIT_TRACK } from './constants';

export default (state = {}, action) => {
  switch (action.type) {
  case INIT_TRACK:
    return { ...state, [action.name]: action.value };
  default:
    return state;
  }
};
