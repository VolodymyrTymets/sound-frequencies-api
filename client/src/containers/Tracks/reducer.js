import { INIT_TRACK, UPDATE_TRACK } from './constants';

export default (state = {}, action) => {
  switch (action.type) {
  case INIT_TRACK:
    return { ...state, [action.name]: action.value };
    case UPDATE_TRACK: {
      console.log('value -> ', action.value)
      console.log('name -> ', action.name)
      console.log('state -> ', state)
      const oldValues = state[action.name] || [];
      return { ...state, [action.name]: [...oldValues,  ...action.value] };
    }

  default:
    return state;
  }
};
