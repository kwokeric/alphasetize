import { combineReducers } from 'redux';
import SpotifyReducer from './SpotifyReducer';

export default combineReducers({
    spotify: SpotifyReducer
});
