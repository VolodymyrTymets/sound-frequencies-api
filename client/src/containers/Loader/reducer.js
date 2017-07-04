import { SWITCH_LOADER } from './constants';

export default (state = {}, action) => {
  switch (action.type) {
  case SWITCH_LOADER:
    return { ...state, [action.name]: action.value };
  default:
    return state;
  }
};
