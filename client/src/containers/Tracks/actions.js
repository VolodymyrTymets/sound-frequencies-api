import { INIT_TRACK } from './constants.js';

export const initTrack = (name, value) => ({
  name,
  value,
  type: INIT_TRACK,
});
