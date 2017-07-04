import { SWITCH_LOADER } from './constants.js';

export const switchLoader = (name, value) => ({
  name,
  value,
  type: SWITCH_LOADER,
});
