import { INIT_TRACK, UPDATE_TRACK, INIT_WAVE, INIT_ENERGY } from './constants.js';

export const initTrack = (name, value) => ({
  name,
  value,
  type: INIT_TRACK,
});

export const initWave = (name, value) => ({
  name,
  value,
  type: INIT_WAVE,
});

export const initEnergy = (name, value) => ({
  name,
  value,
  type: INIT_ENERGY,
});


export const updateTrack = (name, value) => ({
  name,
  value,
  type: UPDATE_TRACK,
});
