import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import PlaylistsReducer from './PlaylistsReducer';
import TracksReducer from './TracksReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    app: AppReducer,
    playlists: PlaylistsReducer,
    tracks: TracksReducer,
    user: UserReducer
});
