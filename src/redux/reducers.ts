import { combineReducers } from 'redux';
import { userReducer, forumReducer } from './slices';

const rootReducer = combineReducers({
  user: userReducer,
  forum: forumReducer, 
});

export default rootReducer;