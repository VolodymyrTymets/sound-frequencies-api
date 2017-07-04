import { combineReducers } from 'redux';
import loader  from './containers/Loader/reducer';


const rootReducer = combineReducers({
  loader,
});

export default rootReducer;
