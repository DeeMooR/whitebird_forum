import { combineReducers } from 'redux';
import { userReducer, forumReducer, usersReducer } from './slices';

const rootReducer = combineReducers({
  user: userReducer,
  forum: forumReducer, 
  users: usersReducer,
});

export default rootReducer;