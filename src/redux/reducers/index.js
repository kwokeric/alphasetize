import { combineReducers } from 'redux';
import TracksReducer from './TracksReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    tracks: TracksReducer,
    user: UserReducer
});
