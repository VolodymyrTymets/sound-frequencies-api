import { INIT_TRACK, UPDATE_TRACK, INIT_WAVE, INIT_ENERGY } from './constants';

const frequencies = (state = {}, action) => {
  switch (action.type) {
  case INIT_TRACK:
    return { ...state, [action.name]: action.value };
    case UPDATE_TRACK: {
      const oldValues = state[action.name] || [];
      return { ...state, [action.name]: [...oldValues,  ...action.value] };
    }
  default:
    return state;
  }
};


const waves = (state = {}, action) => {
  switch (action.type) {
  case INIT_WAVE: {
    return { ...state, [action.name]: action.value };
  }
  default:
    return state;
  }
};

const energys = (state = {}, action) => {
  switch (action.type) {
  case INIT_ENERGY: {
    return { ...state, [action.name]: action.value };
  }
  default:
    return state;
  }
};

export { frequencies, waves, energys };
