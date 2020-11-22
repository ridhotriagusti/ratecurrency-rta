import { combineReducers } from 'redux';
import ratesReducer from './ratesReducer';


export default combineReducers({
  rates: ratesReducer,
});
