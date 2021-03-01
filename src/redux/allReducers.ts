import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import blogReducer from './reducers/blogReducer';

const reducer = combineReducers({
  auth: authReducer,
  blogs: blogReducer,
});

export default reducer;
