import { combineReducers } from 'redux';
import { userReducer, postsReducer, usersReducer, postReducer } from './slices';

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  posts: postsReducer, 
  post: postReducer,
});

export default rootReducer;