import { combineReducers } from 'redux';
import { userReducer, postsReducer, usersReducer, postReducer, localReducer } from './slices';

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  posts: postsReducer, 
  post: postReducer,
  local: localReducer,
});

export default rootReducer;