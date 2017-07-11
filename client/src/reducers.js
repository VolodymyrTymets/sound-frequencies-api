import { combineReducers } from 'redux';
import loader  from './containers/Loader/reducer';
import tracks  from './containers/Tracks/reducer';
import mic  from './containers/Mic/reducer';


const rootReducer = combineReducers({
  loader,
  tracks,
  mic,
});

export default rootReducer;
