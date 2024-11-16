import { combineReducers } from 'redux';
import { userReducer, postsReducer, usersReducer } from './slices';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer, 
  users: usersReducer,
});

export default rootReducer;