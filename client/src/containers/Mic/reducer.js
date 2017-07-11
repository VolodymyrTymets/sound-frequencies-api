import { START_RECORD, RECORDED, STOP_RECORD } from './constants';

const DEFAULT = { status: '' };

export default (state = DEFAULT, action) => {
  switch (action.type) {
  case START_RECORD:
    return { ...state, status: RECORDED };
  case STOP_RECORD:
    return DEFAULT;
  default:
    return state;
  }
};
