import { combineReducers } from 'redux';
import loader  from './containers/Loader/reducer';
import tracks  from './containers/Tracks/reducer';

const rootReducer = combineReducers({
  loader,
  tracks,
});

export default rootReducer;
