import { combineReducers } from 'redux';
import PlaylistsReducer from './PlaylistsReducer';
import TracksReducer from './TracksReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    playlists: PlaylistsReducer,
    tracks: TracksReducer,
    user: UserReducer
});
