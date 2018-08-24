import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import userReducer from './userReducer'

const rootReducer = combineReducers({
  state: (state = {}) => state,
  posts: postsReducer,
  user: userReducer,
});

export default rootReducer;
