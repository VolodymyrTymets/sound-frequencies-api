import { INIT_TRACK, UPDATE_TRACK } from './constants.js';

export const initTrack = (name, value) => ({
  name,
  value,
  type: INIT_TRACK,
});
export const updateTrack = (name, value) => ({
  name,
  value,
  type: UPDATE_TRACK,
});
