import { combineReducers } from 'redux';
import loader  from './containers/Loader/reducer';
import { frequencies,  waves, energys }  from './containers/Tracks/reducer';
import mic  from './containers/Mic/reducer';


const rootReducer = combineReducers({
  loader,
  frequencies,
  waves,
  energys,
  mic,
});

export default rootReducer;
