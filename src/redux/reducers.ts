import { combineReducers } from 'redux';
import { userReducer } from './slices';

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;